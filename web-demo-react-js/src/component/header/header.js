import React, { useState } from 'react'
import './header.css'
import { Link } from 'react-router-dom';
import Dropdownclick from '../dropdown/dropdownclick/dropdownclick';
import { FaUser } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../store/slice/authSlice";

function Header() {
    const dispatch = useDispatch();
    const location = useLocation();
    const login = useSelector(state => state?.auth?.login);
    const userImage = <img src={login?.user?.avatar || userSrc} className='user-image'/>;

    const handleActive = (value) => {
        if (location.pathname === value) {
            return true;
        } else {
            return false;
        }
    }

    // Khai báo hàm handleLogout trước khi sử dụng
    const handleLogout = () => {
        dispatch(logoutSuccess());
    }

    const content = (
        <>
            <li>
                <Link to={'/profile'} style={{ textDecoration: "none", color: "black"}}>Profile</Link>
            </li>
            <li>
                <Link style={{ textDecoration: "none", color: "black" }} onClick={handleLogout}>Logout</Link>
            </li>
        </>
    );

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
                {
                    login?.user ? (
                        <div className='user-button'>
                            <Dropdownclick title={userImage} content={content} position={"-80px"}></Dropdownclick>
                        </div>
                    ) : (
                        <Link to={"/auth/login"} className='user-button'>Login</Link>
                    )
                }
            </div>
        </div>
    )
}

export default Header;

const title = <FaUser size="32px" className='user-image'/>;
const userSrc = 'https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.300.jpg';
