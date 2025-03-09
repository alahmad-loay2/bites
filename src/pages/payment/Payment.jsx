import React from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css"; // Make sure to create and import your CSS file

const Payment = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register'); 
  };

  const handleLogin = () => {
    navigate('/login'); 
  };

  return (
    <div className="payment-plans-page">
      <div className="page-title">
        <h1>Choose Your Plan</h1>
        <p>Select a plan that suits your cooking style. Unlock delicious recipes and start cooking!</p>
      </div>

      <div className="plans-container">
        <div className="plan-card free-plan">
          <h3>Free Plan</h3>
          <p>Get access to simple, easy-to-follow recipes that anyone can cook!</p>
          <ul>
            <li>Basic, easy recipes</li>
            <li>Step-by-step instructions</li>
          </ul>
          <div className="buttons">
          <button onClick={handleLogin}>Login</button>
          <button onClick = {handleRegister}>Register</button>
          </div>
        </div>

  
        <div className="plan-card paid-plan">
          <h3>Paid Plan</h3>
          <p>Enjoy lifetime access to all recipes with just a one-time payment-no recurring fees!</p>
          <ul>
            <li>All recipes unlocked</li>
            <li>Complex and advanced recipes</li>
            <li>Exclusive premium content</li>
            <li>Access to live cooking events</li>
          </ul>
          <div className="buttons">
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;


