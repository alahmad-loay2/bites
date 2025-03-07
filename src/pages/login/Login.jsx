import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login-register.css";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="glass-card">
        <h2>Login</h2>

        <div className="alert alert-dark">
          Wrong username or password
        </div>

        <form>
          <div className="label-input">
            <label>Email</label>
            <input type="email" placeholder="Enter email" required />
          </div>

          <div className="label-input">
            <label>Password</label>
            <input type="password" placeholder="Enter password" required />
          </div>
          <button type="submit" className="btn btn-dark">Login</button>
        </form>

        <div>
          <Link to='/register'><button className="btn btn-link">Don't have an account? Register</button></Link>
          <Link to='/'><button className="btn btn-dark">Back to Home</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
