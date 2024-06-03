import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '../Page/HomePage'
import LoginPage from '../Page/LoginPage'
import RegisterPage from '../Page/RegisterPage'
import ForgetPassword from '../Page/ForgetPassword'
import PhoneLoginPage from '../Page/PhoneLoginPage'


const MainRoute = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Navigate to='/login' />} />
                <Route path='/home' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />

                {/* <Route path = '/loginPhone' element= {<PhoneLoginPage/>}/> */}
                <Route path = '/phone' element= {<PhoneLoginPage/>}/>
                <Route path = '/login/phone' element= {<PhoneLoginPage/>}/>



                <Route path='/register' element={<RegisterPage />} />
                <Route path='/forgetpassword' element={<ForgetPassword />} />
            </Routes>
        </>
    )
}

export default MainRoute