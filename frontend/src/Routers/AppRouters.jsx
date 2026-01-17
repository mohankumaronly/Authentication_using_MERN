import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import RegisterPage from '../pages/RegisterPage'
import Login from '../pages/Login'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'

const AppRouters = () => {
    return (
        <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/auth/register' element={<RegisterPage />} />
            <Route path='/auth/login' element={<Login />} />
            <Route path='/auth/forgot-password' element={<ForgotPasswordPage />} />
        </Routes>
    )
}

export default AppRouters