import React from 'react'
import './recipes.css'
import { useNavigate } from 'react-router-dom'

const Recipes = () => {
    const navigate = useNavigate()
  return (
    <>
    <div className="free-recipes">
        <h3>lara stuff free cards w osas</h3>
        <p>map over and one card is a component dont do it here</p>
    </div>
    <div className='paid-recipes'>
        <h3>lara stuff paid w osas</h3>
        <p>takes to login when he logsin then we take him to payment 
            no need to add demo cards here since we need backend 
        </p>
        <button onClick={() => navigate('/login')}  className='btn btn-dark'>paid</button>
    </div>
</>
  )
}

export default Recipes
