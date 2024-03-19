import React from 'react'
import './footer.css'
import { FaFacebookF, FaGithub, FaGoogle, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <div className='footer-container'>
      <div className='footer-main-container'>
        <div className='text-conterner'>
          <p className='text-title'>Welcome to our website.</p>
          <p className='text-content'>We're delighted to have you here and can't wait to share our work with you.</p>
        </div>
        <div className='icon-container'>
          <FaFacebookF />
          <FaTwitter />
          <FaGoogle />
          <FaLinkedinIn />
          <FaGithub />
        </div>
      </div>
      <div className='footer-sub-container'>
        <p>Coppyright &copy; CodeOpacity. Design by NETHUNT</p>
      </div>
    </div>
  )
}

export default Footer;
