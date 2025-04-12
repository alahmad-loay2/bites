import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import './breadcrumbs.css';

const Breadcrumb = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');

    useEffect(() => {
        const fetchTitle = async () => {
            try {
                const docRef = doc(db, "recipes", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setTitle(docSnap.data().title);
                } else {
                    setTitle('Unknown Recipe');
                }
            } catch (err) {
                console.error("Failed to fetch recipe title:", err);
                setTitle('Unknown Recipe');
            }
        };

        fetchTitle();
    }, [id]);

    return (
        <div className="breadcrumb">
            <Link to="/recipes">Recipes</Link>
            <span className="separator">›</span>
            <span className="middle">{title || '...'}</span>
            <span className="separator">›</span>
            <span className="current">Steps</span>
        </div>
    );
};

export default Breadcrumb;