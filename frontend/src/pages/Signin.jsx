import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { ButtonWarning } from "../components/ButtonWarning";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        {
          username,
          password,
        }
      );

      console.log("Server response:", response.data);

      if (response.data) {
        alert("Log in successful");
        navigate("/dashboard");
      } else {
        alert("No credentials found in database. Please sign up.");
      }
    } catch (error) {
      console.error("Error during signin:", error);
      alert("An error occurred during signin. Please try again.");
    }
  };
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-slate-50 w-80 text-center p-2 h-max px-4 w-full">
          <Heading label={"Sign In"} />
          <SubHeading text={"Enter your credentials to access your account"} />
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
            <Button text={"Sign in"} onClick={handleSignin} />
          </div>
          <ButtonWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
}
