import React from 'react'
import {Link} from 'react-router-dom'
function Header() {
  return (
    <div className='container1'>
      <Link to='/' className='link'>Workout Buddy</Link>
    </div>
  )
}

export default Header