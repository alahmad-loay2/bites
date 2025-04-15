import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from '../pages/404/NotFound'
import Login from '../pages/login/Login'
import Recipes from '../pages/recipes/Recipes'
import Home from '../pages/home/Home'
import MainLayout from './MainLayout'
import Payment from '../pages/payment/Payment'
import Register from '../pages/register/Register'
import Steps from '../pages/steps/Steps'
import ProtectedRoute from './ProtectedRoute'
import Unauthorized from '../pages/unauthorized/Unauthorized'
import Admin from '../pages/admin/Admin'
import AdminProtected from './AdminProtected'
import AdminUsers from '../pages/admin/AdminUsers'
import Account from '../pages/account/Account'
import AccountProtected from './AccountProtected'
import Cooking from '../pages/steps/Cooking';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/recipes' element={<Recipes />} />
                    <Route element={<ProtectedRoute />}>
                    <Route path='/recipes/steps/:id' element={<Steps />} />
                    <Route path='/cooking' element={<Cooking/>}/>
                    </Route>
                    <Route element={<AdminProtected />}>
                    <Route path='/admin' element={<Admin />}/>
                    </Route>
                    <Route path='/payment' element={<Payment />}/>
                </Route>
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>}/>
                <Route path='/recipes/steps/:id' element={<Steps />} />
                <Route element={<AdminProtected />}>
                    <Route path='/admin/recipes' element={<Admin />}/>
                </Route>
                <Route element={<AdminProtected />}>
                    <Route path='/admin/users' element={<AdminUsers />}/>
                </Route>
                <Route element={<AccountProtected />}>
                <Route path='/account' element={<Account />} />
                </Route>
                <Route path='*' element={<NotFound />} />
                <Route path='/unauthorized' element={<Unauthorized />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
