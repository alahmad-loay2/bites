import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from '../pages/404/NotFound'
import Login from '../pages/login/Login'
import Recipes from '../pages/recipes/Recipes'
import Home from '../pages/home/Home'
import MainLayout from './MainLayout'
import Register from '../pages/register/Register'
import Payment from '../pages/Payment/Payment'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/recipes' element={<Recipes />} />
                    <Route path='/payment' element={<Payment />}/>
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />}/>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
