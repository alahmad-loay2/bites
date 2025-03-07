import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../login/Login-register.css";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="register-container">
      <div className="glass-card">
        <h2>Register</h2>

        <div className="alert alert-dark">
          invalid cridentials
        </div>

        <form>
        <div className="label-input">
            <label>Username</label>
            <input type="email" placeholder="Enter username" required />
          </div>

          <div className="label-input">
            <label>Email</label>
            <input type="email" placeholder="Enter email" required />
          </div>

          <div className="label-input">
            <label>Password</label>
            <input type="password" placeholder="Enter password" required />
          </div>
          <button type="submit" className="btn btn-dark">Register</button>
        </form>

        <div>
          <Link to='/login'><button className="btn btn-link">Have an account? Login</button></Link>
          <Link to='/'><button className="btn btn-dark">Back to Home</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
