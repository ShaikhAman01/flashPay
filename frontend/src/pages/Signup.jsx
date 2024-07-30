import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { ButtonWarning } from "../components/ButtonWarning";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import OTPVerification from "../components/OTPVerification";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
    const [userId, setUserId] = useState(null); 
  const [message, setMessage] = useState("");


  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        firstName,
        lastName,
        username,
        password,
      });

      if (response.data.message === "User created successfully, OTP sent") {
        setUserId(response.data.userId);
        setMessage("Please check your email for the OTP.");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setMessage("An error occurred during signup.");
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-slate-50 text-center p-2 h-max px-4 w-full">
          <Heading label={"Sign Up"} />
          <SubHeading text={"Enter your information to create an account"} />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            label={"First Name"}
            placeholder={"John"}
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            label={"Last Name"}
            placeholder={"Doe"}
          />
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            label={"Email"}
            placeholder={"John@gmail.com"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password"}
            placeholder={""}
          />
          <div className="pt-4">
            <Button
              onClick={handleSignup}
              text={"Sign up"}
            />
          </div>
          <ButtonWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />

          {userId && <OTPVerification userId={userId} />}
          <p>{message}</p>

          
        </div>
      </div>
    </div>
  );
}
