import React from 'react'
import { Heading } from '../components/Heading';
import { SubHeading } from '../components/SubHeading';
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';
import { ButtonWarning } from '../components/ButtonWarning';

export default function Signup() {
  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
    <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-slate-50 w-80 text-center p-2 h-max px-4 w-full'>
            <Heading label={"Sign Up"}/>
            <SubHeading text={"Enter your information to create an account"}/>
            <InputBox label={"First Name"} placeholder={"John"}/>
            <InputBox label={"Last Name"} placeholder={"Doe"}/>
            <InputBox label={"Email"} placeholder={"John@gmail.com"}/>
            <InputBox label={"Password"} placeholder={""}/>
            <div className='pt-4'>
            <Button text={"Sign up"}/>
            </div>
            <ButtonWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
        </div>
    </div>
    </div>
  )
}
