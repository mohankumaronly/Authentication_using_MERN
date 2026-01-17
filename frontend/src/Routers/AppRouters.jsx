import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import RegisterPage from '../pages/RegisterPage'
import Login from '../pages/Login'

const AppRouters = () => {
    return (
        <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/auth/register' element={<RegisterPage />} />
            <Route path='/auth/login' element={<Login />} />
        </Routes>
    )
}

export default AppRouters