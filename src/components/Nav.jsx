import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '/images/logo.png'
import getUserInfo from "../firebase/getUserInfo";
import { logOut } from '../firebase/getUserInfo'

const Nav = () => {
    const location = useLocation()
    const { userInfo, loading } = getUserInfo();

    return (
        <nav>
            <img src={logo} alt="logo.png" />
            <ul>
                <Link to='/' className={location.pathname === "/" ? "active" : ""}>Home</Link>
                <Link to='/recipes' className={location.pathname === "/recipes" ? "active" : ""}>Recipes</Link>
                <Link to='/payment' className={location.pathname === "/payment" ? "active" : ""}>Plans</Link>
            </ul>

            {loading ? (
                <span>loading</span>
            ) : userInfo ? (

                    <div className="dropdown">
                        <button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {userInfo.username}
                        </button>
                        <ul className="dropdown-menu">
                            <li><button onClick={logOut} className="dropdown-item" type="button">logout</button></li>
                        </ul>
                    </div>

            ) :
                <Link to='/login' className='login'><button className='btn btn-dark'>Log In</button></Link>
            }
        </nav>
    )
}

export default Nav
