// ProfilePage.js
import React from 'react';
import { Link, Outlet } from "react-router-dom";
import Header from '../../component/header/header';
import Footer from '../../component/footer/footer';
import './profilePage.css';
import ProfileAvatar from '../../component/profile/profileavatar/profileAvatar';

function ProfilePage() {
    return (
        <div className="profile-page-container">
            <Header />
            <div className="profile-content">
                <div className='profile-left'>
                    <div className='profile-avatar'>
                        <ProfileAvatar />
                    </div>
                    <div className="profile-info">
                        <p>UserName</p>
                        <p>Email@gmail.com</p>
                    </div>
                    <div className="change-password-link">
                        <Link to="#">Change password</Link>
                    </div>
                </div>
                <div className='profile-right'>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProfilePage;
