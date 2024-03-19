import React from 'react';
import './userPage.css'
import { Outlet } from "react-router-dom";
import Header from '../../component/header/header';
import Footer from '../../component/footer/footer';

function UserPage() {
    return (
        <div className='user-page-container'>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>    
        </div>
    )
}

export default UserPage;
