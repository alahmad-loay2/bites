import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from '../pages/404/NotFound'
import Login from '../pages/login/Login'
import Recipes from '../pages/recipes/Recipes'
import Home from '../pages/home/Home'
import MainLayout from './MainLayout'
import Register from '../pages/register/Register'
import Payment from '../pages/payment/Payment'
import Loading from '../components/Loading'
import Billing from '../pages/payment/BillingForm'
import Steps from '../pages/steps/Steps'
import ProtectedRoute from './ProtectedRoute'
import Unauthorized from '../pages/unauthorized/Unauthorized'
import Admin from '../pages/admin/Admin'
import AdminProtected from './AdminProtected'

const AppRoutes = () => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    }, []);
    return (
        <BrowserRouter>
         {loading && <Loading />}
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/recipes' element={<Recipes />} />
                    <Route element={<ProtectedRoute />}>
                    <Route path='/recipes/steps/:id' element={<Steps />} />
                    </Route>
                    <Route element={<AdminProtected />}>
                    <Route path='/admin' element={<Admin />}/>
                    </Route>
                    <Route path='/payment' element={<Payment />}/>
                    <Route path='/billing' element={<Billing/>}/>
                </Route>
                <Route path='/login' element={<Login setLoading={setLoading}/>} />
                <Route path='/register' element={<Register setLoading={setLoading}/>}/>
                <Route path='*' element={<NotFound />} />
                <Route path='/unauthorized' element={<Unauthorized />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
