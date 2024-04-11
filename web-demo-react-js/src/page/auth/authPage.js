import React from 'react'
import './authPage.css'
import {Outlet} from "react-router-dom";
function AuthPage() {
  return (
    <div className='auth-page-container'>
        <Outlet></Outlet>
    </div>
  )
}

export default AuthPage;
