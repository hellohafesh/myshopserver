import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
        <h4 className='text-center'>My Shop BD </h4>
        <p className='text-center'>All Right Reserved &copy; My Shop </p>
        <p className='text-center mt-3'>
            <Link to='/about'>About</Link>
            |
            <Link to='/contact'>Contact</Link>
            |
            <Link to='/policy'>Privecy & Policy</Link>
        </p>
    </div>
  )
}

export default Footer