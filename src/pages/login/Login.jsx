import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login-register.css";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../../firebase/config";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [error, setError] = useState(false)

    const handleLogIn = async (e) => {
        e.preventDefault()
        setError(false)
        try {
        await signInWithEmailAndPassword(auth, email, pass)
        navigate("/")
        } catch(err){
            setError(true)
        }
    };
  return (
    <div className="login-container">
      <div className="glass-card">
        <h2>Login</h2>

        {error && <div className="alert alert-dark">
          Wrong username or password
        </div> }

        <form onSubmit={handleLogIn}>
          <div className="label-input">
            <label>Email</label>
            <input type="email" placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="label-input">
            <label>Password</label>
            <input type="password" placeholder="Enter password" 
            onChange={(e) => setPass(e.target.value)} required />
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
