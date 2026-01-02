import React from 'react'
import RegisterPage from '../pages/RegisterPage'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'
import ResetPasswordPage from '../pages/ResetPasswordPage'
import HomePage from '../pages/HomePage'

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            <Route path='/auth/reset-password' element={<ResetPasswordPage />} />
            <Route path='/home' element={<HomePage />} />
        </Routes>               
    )
}

export default Routers