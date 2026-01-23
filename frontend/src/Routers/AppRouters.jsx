import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import RegisterPage from '../pages/RegisterPage'
import Login from '../pages/Login'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'
import ResetPasswordPage from '../pages/ResetPasswordPage'

const AppRouters = () => {
    return (
        <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/auth/register' element={<RegisterPage />} />
            <Route path='/auth/login' element={<Login />} />
            <Route path='/auth/forgot-password' element={<ForgotPasswordPage />} />
            <Route path='/auth/reset-password' element={< ResetPasswordPage />} />
            <Route path='/auth/verify-email/:token' element={< ResetPasswordPage />} />
        </Routes>
    )
}

export default AppRouters