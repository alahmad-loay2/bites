import React from 'react'
import { Link } from 'react-router-dom'
const Unauthorized = () => {
  return (
    <div className="not-found d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h3 className="fw-bold">Not Authorized</h3>
      <Link to='/'><button className="btn btn-secondary mt-3">Back Home</button></Link>
    </div>
  )
}

export default Unauthorized;
