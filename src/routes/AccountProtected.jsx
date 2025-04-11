import React from 'react'
import getUserInfo from '../firebase/getUserInfo';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from '../components/Loading';

const AccountProtected = () => {
    const { userInfo, loading } = getUserInfo();
    if (loading) {
        return (
            <>
                <Loading text={"Loading your profile..."} />

            </>
        );
    }
    return userInfo ? <Outlet /> : <Navigate to="/unauthorized" replace />;
}

export default AccountProtected
