import React from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import getUserInfo from "../../firebase/getUserInfo";


const Payment = () => {
  const navigate = useNavigate();
  
  const { userInfo, loading } = getUserInfo();

  if (loading) return <p>Loading...</p>; 
  const isPaidUser = userInfo?.paid || false;

  const handleBilling = () => {
    navigate('/billing'); 
  };
  return (
    <div className="background-container">
    <div className="payment-plans-page">
      <div className="page-title">
        <h1>Get your Plan</h1>
        <p>Choose the plan that suits you best and start your cooking journey today!</p>  {/*change later */}
      </div>

      <div className="plans-container">

      <div className={`plan-card ${!isPaidUser ? "current-plan" : "other-plan"}`}>
          <h3>Free Plan</h3>
          <strong>0$</strong>
          <hr className="hr-divider" />
          <div className="buttons">
          <button 
                onClick={isPaidUser ? undefined : handleBilling} 
                disabled={isPaidUser}
              >
                {isPaidUser ? "Get Plan" : "Current Plan"}
              </button>
          </div>
          
          <ul className="payment-details">
            <li><FontAwesomeIcon icon={faCheck} className="icon"/>Access to basic recipes</li>
            <li><FontAwesomeIcon icon={faCheck} className="icon"/>Step-by-step instructions with animation</li>
            <li><FontAwesomeIcon icon={faCheck} className="icon"/>Basic virtual chef guidance</li>
          </ul>
        </div>

        <div className={`plan-card ${isPaidUser ? "current-plan" : "other-plan"}`}>
          <h3>Paid Plan</h3>
          <p><strong>100$</strong> one-time</p>
          <hr className="hr-divider" />
          <div className="buttons">
          <button onClick={!isPaidUser ? handleBilling : undefined} disabled={isPaidUser}>
                {isPaidUser ? "Current Plan" : "Get Plan"}
              </button>
          </div>
          <ul className="payment-details">
            <li><FontAwesomeIcon icon={faCheck} className="icon"/>One-time payment, lifetime access</li>
            <li><FontAwesomeIcon icon={faCheck} className="icon"/>Complex recipes made beginner friendly</li>
            <li><FontAwesomeIcon icon={faCheck} className="icon"/>Calorie breakdown for reach recipe</li>
            <li><FontAwesomeIcon icon={faCheck} className="icon"/>Future updates without extra charge</li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Payment;


