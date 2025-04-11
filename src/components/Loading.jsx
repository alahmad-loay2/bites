import { ChefHat } from 'lucide-react';
import React from 'react'

const Loading = ({text}) => {

    return (
        <div className="account-loading">
            <ChefHat className="loading-icon" size={40} />
            <p>{text}</p>
        </div>
    );

}

export default Loading
