import React from 'react'
import InputText from '../common/InputText'
import CommonLayout from '../layouts/CommonLayout'
import useInputText from '../Hooks/InputHooks'
import Button from '../common/Button'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {

  const navigate = useNavigate();

  const {
    formData,
    onChange,
    reset
  } = useInputText({
    firstName: "",
    secondName: "",
    email: "",
    password: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    reset();
  }

  return (
    <>
      < CommonLayout>
        <div className='flex bg-gray-100 p-5 shadow-2xl flex-col w-96'>
          <form onSubmit={handleSubmit}
            className='space-y-6'
          >
            <InputText
              type="text"
              placeholder="Enter first name"
              name="firstName"
              label="First name"
              value={formData.firstName}
              onChange={onChange}
            />
            <InputText
              type="text"
              placeholder="Enter second name"
              name="secondName"
              label="Second name"
              value={formData.secondName}
              onChange={onChange}
            />
            <InputText
              type="email"
              placeholder="Enter email"
              name="email"
              label="Email"
              value={formData.email}
              onChange={onChange}
            />
            <InputText
              type="password"
              placeholder="Enter password"
              name="password"
              label="Password"
              value={formData.password}
              onChange={onChange}
            />
            <Button type="submit" text="Create account" fullWidth />
            <Button type="button" text="Continue with google" fullWidth onClick={() => {
              console.log("continue with google is triggered")
            }} />
            <p className='text-center'>Already have an account? <span className='font-bold cursor-pointer hover:underline'
              onClick={() => {
                navigate('/auth/login');
              }}
            >Sing in</span></p>
          </form>
        </div>
      </CommonLayout>
    </>
  )
}

export default RegisterPage