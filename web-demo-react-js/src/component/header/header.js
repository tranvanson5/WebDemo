import React, { useState } from 'react'
import './header.css'
import { Link } from 'react-router-dom';
import Dropdownclick from '../dropdown/dropdownclick/dropdownclick';
import { FaUser } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

function Header() {
    const location = useLocation();
    const handleActive = (value) =>{
        if(location.pathname==value){
            return true;
        }else {
            return false
        }
    }
    return (
        <div className='header-container'>
            <div className='logo-container'>
                Logo
            </div>
            <div className='navigate-container'>
                <Link to={'/'} className='navigate' style={{background: handleActive('/')?'rgb(236, 235, 234)':''}}>Home</Link>
                <Link to={'/product'} className='navigate' style={{background: handleActive('/product')?'rgb(236, 235, 234)':''}}>Product</Link>
                <Link to={'/about'} className='navigate' style={{background: handleActive('/about')?'rgb(236, 235, 234)':''}}>About</Link>
                <Link to={'/contact'}  className='navigate' style={{background: handleActive('/contact')?'rgb(236, 235, 234)':''}}>Contact</Link>

                <div className='user-button'>
                    <Dropdownclick title={userImage} content={content} position={"-80px"}></Dropdownclick>
                </div>
            </div>
        </div>
    )
}

export default Header;

const title = <FaUser size="32px" className='user-image'/>;
const content = <><li><Link to={'/profile'} style={{ textDecoration: "none", color: "black"}}>Profile</Link></li>  <li><Link style={{ textDecoration: "none", color: "black" }}>Logout</Link></li></>
const userImage = <img src='https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.300.jpg'className='user-image'/>;
