// ProfilePage.js
import React, {useEffect} from 'react';
import { Link, Outlet } from "react-router-dom";
import Header from '../../component/header/header';
import Footer from '../../component/footer/footer';
import './profilePage.css';
import ProfileAvatar from '../../component/profile/profileavatar/profileAvatar';
import {useSelector} from "react-redux";
import {useAuthorization} from "../../service/useAuthorization";
function ProfilePage() {
    const user = useSelector(state => state?.auth?.login?.user);
    useAuthorization(["ROLE_ADMIN", "ROLE_PM", "ROLE_USER"]);
    return (
        <div className="profile-page-container">
            <Header />
            <div className="profile-content">
                <div className='profile-left'>
                    <div className='profile-avatar'>
                        <ProfileAvatar />
                    </div>
                    <div className="profile-info">
                        <p><b>{user?.username}</b></p>
                        <p>{user?.email}</p>
                    </div>
                    <div className="change-password-link">
                        <p style={{textAlign:"center"}}>
                            <Link to="/profile">Information</Link>
                        </p>
                        <p style={{textAlign: "center"}}>
                            <Link to="/profile/change-password">Change password</Link>
                        </p>
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
