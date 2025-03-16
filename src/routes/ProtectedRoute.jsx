import React, { useEffect } from 'react';
import { useNavigate, Outlet, useParams } from 'react-router-dom';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const ProtectedRoute = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const checkAccess = async () => {
            if (!id) {
                return;
            }
            try {
                const recipeRef = doc(db, "recipes", id);
                const recipeSnap = await getDoc(recipeRef);
                if (!recipeSnap.exists()) {
                    navigate('/unauthorized'); 
                }
            } catch (error) {
                navigate('/unauthorized'); 
            }
        };

        checkAccess();
    }, [id, navigate]);

    return <Outlet />;
};

export default ProtectedRoute;
