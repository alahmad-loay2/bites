import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import getUserInfo from "../../firebase/getUserInfo";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";


const Payment = () => {  
  const { userInfo, loading } = getUserInfo();
  const navigate = useNavigate()

  const savePayment = async () => {
      try {
        const user = auth.currentUser;
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, { paid: true }, { merge: true });
        window.location.reload();
      } catch (err) {
        console.error("Failed");
    } 
  };
  

  useEffect(() => {
    if (window.Paddle) {
      window.Paddle.Environment.set("sandbox");
      window.Paddle.Initialize({ 
        token: "test_0b97b9030ee23f48f53bc9be146",
        eventCallback: function(event){
          if (event.name === "checkout.completed") {
           savePayment(event)
          }
        }
      });
    } else {
      console.error("Error");
    }
  }, []);

  if (loading) return(
    <div className="background-container d-flex justify-content-center">
    <div className="spinner-border" role="status" style={{ color: "var(--accent-color)" }}>
    </div>
  </div>
  ); 
  const isPaidUser = userInfo?.paid || false;

  const handlePaddlePayment = () => {
    if (!userInfo) {
      navigate("/login")
      return;
    }
    if (window.Paddle) {
      window.Paddle.Checkout.open({
        items: [
          {
            priceId: "pri_01jrhrc77vrh690c3aba39nrkc", 
            quantity: 1
          }
        ],
        customer: {
          email: userInfo.email
        },
    });
    } else {
      alert("Paddle error.");
    }
  };
 

  return (
    <div className="background-container">
      <div className="page-title">
        <h1>Get your Plan</h1>
        <p>Choose the plan that suits you best and start your cooking journey today!</p> 
      </div>

      <div className="plans-container">

      <div className={`plan-card ${!isPaidUser ? "current-plan" : "other-plan"}`}>
          <h3>Free Plan</h3>
          <strong>0$</strong>
          <hr className="hr-divider" />
          <div className="buttons">
          <button disabled>
                {isPaidUser ? "you're a paid customer!" : "Current Plan"}
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
          <p><strong>120$</strong> one-time</p>
          <hr className="hr-divider" />
          <div className="buttons">
          <button onClick={!isPaidUser ? handlePaddlePayment : undefined} disabled={isPaidUser}>
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
  );
};

export default Payment;


