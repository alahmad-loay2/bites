import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '/images/logo.png'
import getUserInfo from "../firebase/getUserInfo";
import { logOut } from '../firebase/getUserInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
    const location = useLocation()
    const { userInfo, loading } = getUserInfo();

    return (
        <nav>
            <img src={logo} alt="logo.png" />
            <button className="btn hamburger-icon" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
                <FontAwesomeIcon icon={faBars} size="lg" />
            </button>

            <div className="nav-wrapper">
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
            </div>
            <div className="offcanvas offcanvas-top" tabIndex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasTopLabel">Menu</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul>
                        <li><Link to='/' className={location.pathname === "/" ? "active" : ""}>Home</Link></li>
                        <li><Link to='/recipes' className={location.pathname === "/recipes" ? "active" : ""}>Recipes</Link></li>
                        <li><Link to='/payment' className={location.pathname === "/payment" ? "active" : ""}>Plans</Link></li>
                    </ul>

                    {loading ? (
                        <span>Loading...</span>
                    ) : userInfo ? (
                        <div className="dropdown mt-3">
                            <button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {userInfo.username}
                            </button>
                            <ul className="dropdown-menu">
                                <li><button onClick={logOut} className="dropdown-item" type="button">Logout</button></li>
                            </ul>
                        </div>
                    ) : (
                        <Link to='/login' className='login'><button className='btn btn-dark mt-3'>Log In</button></Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Nav
