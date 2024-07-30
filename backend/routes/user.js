const express = require("express");
const router = express.Router();
const zod = require("zod");
const bcrypt = require("bcrypt");
require("dotenv").config();
const nodemailer = require("nodemailer");
const { authMiddleware } = require("../middleware");
const { User, Account, UserOTPVerification } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken/Incorect inputs",
    });
  }

  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const user = await User.create({
      username: req.body.username,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      verified: false,
    });

    const userId = user._id;

    await Account.create({
      userId,
      balance: 1 + Math.random() * 10000,
    });

    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );
   console.log("BEfore OTP")
    const otpResult = await sendOTPVerificationEmail(user, res);

    if (!otpResult.success) {
      return res.status(500).json({
        status: "Error sending OTP",
        message: otpResult.message,
      });
    }

    res.json({
      userId: userId,
      message: "User created successfully, OTP sent",
      token: token,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

//Node Mailer
let transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

//OTP
const sendOTPVerificationEmail = async (user) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    //mail
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: user.username,
      subject: "Verify Your Email",
      html: `<p> Enter <b>${otp}</b> in the website to verify your email address and complete the signup process </p>
      <p>This code <b>expires in 1 hour </b>. </p>
      <br>
      <br>
      <br>
      <p><b>Team FlashPay</b></p>`,
    };
    //hash otp
    const saltRounds = 10;
    const hashedOTP = await bcrypt.hash(otp, saltRounds);

    const newOTPVerification = new UserOTPVerification({
      userId: user._id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });


    //save otp record
    await newOTPVerification.save();

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response); // Log email sending result

    return { success: true };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return { success: false, message: error.message };
  }
};

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
  });

  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );
    res.json({
      token: token,
    });
    return;
  }

  res.status(411).json({
    message: "Error while loggin in",
  });
});

router.post("/verifyOTP", async (req, res) => {
  try {
    let { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({
        status: "FAILED",
        message: "Empty OTP details are not allowed",
      });
    }
    const otpRecord = await UserOTPVerification.findOne({
      userId,
    });

    // OTP record exists or not 
    if (!otpRecord) {
      return res.status(400).json({
        status: "FAILED",
        message: "Account record doesn't exist or has been verified already",
      });
      
    } 
    
      const { expiresAt } = otpRecord;
      const hashedOTP = otpRecord.otp;

      if (expiresAt < Date.now()) {
        //otp epxired
        await UserOTPVerification.deleteOne({ userId });
        return res.status(400).json({
          status: "FAILED",
          message: "Code has expired. Please request again",
        });
      } 
      
        const validOTP = await bcrypt.compare(otp, hashedOTP);
       
        if (!validOTP) {
          return res.status(400).json({
            status: "FAILED",
            message: "Invalid OTP",
          });
        } 

          await User.updateOne({ _id: userId }, { verified: true });
          await UserOTPVerification.deleteMany({ userId });

          res.json({
            status: "VERIFIED",
            message: "User Email verified successfully",
          });

          console.log("UserId:" + userId + "OTP:" + otp + "ExpiresAt:" + expiresAt + "HAshedOTP: " +hashedOTP)
        
      
    
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }

  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }

  await User.updateOne(
    {
      _id: req.userId,
    },
    req.body
  );

  res.json({
    message: "Updated successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
