import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '/images/logo.png'
import getUserInfo from "../firebase/getUserInfo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { userInfo, loading } = getUserInfo();
    
      
    return (
        <nav>
            <div className="nav-inner">
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
                    <>
                        {userInfo?.isAdmin && <Link className='adminNav' to='/admin/recipes'>Admin</Link>}
                        <button className="btnStyle" onClick={() => navigate("/account")} type="button">
                            {userInfo.username}
                        </button>
                        </>
                ) :
                    <Link to='/login' className='login'><button className='btnStyle'>Log In</button></Link>
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
                        <div className='offcanvasAdmin'>
                        {userInfo?.isAdmin && <Link className='adminNav' to='/admin/recipes'>Admin</Link>}
                            <button className="btnStyle" type="button" onClick={() => navigate("/account")}>
                                {userInfo.username}
                            </button>
                            </div>
                    ) : (
                        <Link to='/login' className='login'><button className='btnStyle'>Log In</button></Link>
                    )}
                </div>
            </div>
            </div>
        </nav>
    )
}

export default Nav
