import React from 'react'
import './NotFound.css'
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <div className="not-found d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h3 className=" fw-bold">404 - Not Found</h3>
      <Link to='/'><button className="btn btn-secondary mt-3">Back Home</button></Link>
    </div>
  )
}

export default NotFound
