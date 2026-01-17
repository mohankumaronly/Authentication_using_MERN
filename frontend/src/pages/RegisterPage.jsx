import React from 'react'
import InputText from '../common/InputText'
import CommonLayout from '../layouts/CommonLayout'
import useInputText from '../Hooks/InputHooks'
import Button from '../common/Button'

const RegisterPage = () => {

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

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <div>
      < CommonLayout>
        <form onSubmit={onSubmit}>
          <InputText
            type="text"
            placeholder="Enter first name"
            name="firstName"
            label="First name"
            value={FormData.firstName}
            onChange={onChange}
          />
          <InputText
            type="text"
            placeholder="Enter second name"
            name="secondName"
            label="Second name"
          />
          <InputText
            type="email"
            placeholder="Enter email"
            name="email"
            label="Email"
          />
          <InputText
            type="password"
            placeholder="Enter password"
            name="password"
            label="Password"
          />
        </form>
      </CommonLayout>
    </div>
  )
}

export default RegisterPage