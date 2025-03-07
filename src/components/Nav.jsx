import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '/images/logo.png'
const Nav = () => {
    const location = useLocation()
  return (
    <nav>
        <img src={logo} alt="logo.png" />
      <ul>
        <Link to='/' className={location.pathname === "/" ? "active" : ""}>Home</Link>
        <Link to='/recipes' className={location.pathname === "/recipes" ? "active" : ""}>Recipes</Link>
        <Link to='/payment' className={location.pathname === "/payment" ? "active" : ""}>Plans</Link>
        <Link to='/login' className='login'><button className='btn btn-dark'>Log In</button></Link>
      </ul>
    </nav>
  )
}

export default Nav
