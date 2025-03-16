import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../login/Login-register.css";
import { auth, db } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const Register = ({setLoading}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("")
    

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("")
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email,password);
            const user = auth.currentUser;
            await setDoc(doc(db, "users", user.uid), {
                email,
                username,
                paid: false
            });
            setLoading(true);
            navigate(`/`);
        } catch (err) {
            const friendlyMessage = getFriendlyErrorMessage(err.code); 
            setError(friendlyMessage);
        }
    };

    const getFriendlyErrorMessage = (errorCode) => {
        const errorMessages = {
            "auth/email-already-in-use": "This email is already in use. Try logging in instead.",
            "auth/invalid-email": "Please enter a valid email address.",
            "auth/weak-password": "Password should be at least 6 characters long.",
            "auth/missing-password": "Please enter a password.",
            "auth/network-request-failed": "Network error! Check your connection.",
            "auth/too-many-requests": "Too many login attempts. Try again later.",
            "auth/internal-error": "An unexpected error occurred. Try again later.",
        };
    
        return errorMessages[errorCode] || "An unknown error occurred. Please try again.";
    };


    return (
        <div className="register-container">
            <div className="glass-card">
                <h2>Register</h2>

                { error && <div className="alert alert-dark">
                    {error}
                </div> }

                <form onSubmit={handleRegister}>
                    <div className="label-input">
                        <label>Username</label>
                        <input type="text" placeholder="Enter username"
                        onChange={(e) => setUsername(e.target.value)} required />
                    </div>

                    <div className="label-input">
                        <label>Email</label>
                        <input type="email" placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}  required />
                    </div>

                    <div className="label-input">
                        <label>Password</label>
                        <input type="password" placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}  required />
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
