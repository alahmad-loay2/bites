import React from 'react'
import { ChefHat } from 'lucide-react';

const Divider = ({ backgroundColor = 'black', color = 'white', text = '' }) => {
  return (
    <div className='divider' style={{ backgroundColor, color }}>
      <p>{text}</p>
      <ChefHat className="divider-icon" size={30} />
    </div>
  )
}

export default Divider
