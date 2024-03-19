import React, { useState } from 'react'
import '../login/loginForm.css'
import InputCustom from '../../input/input/inputCustom'
import { Link } from 'react-router-dom';

function Register() {
    const [form, setForm] = useState({});

    const handleInput = (name, value) => {
        setForm({ ...form, [name]: value });
    };

    console.log(form);
    return (
        <div className='login-form-container'>
            <p className="login-title">Register</p>
            <form>
                <div className="input-field">
                    <InputCustom type='text' label='Name' onChange={(value) => handleInput('name', value)} name="name" placeholder='Enter name' />
                </div>
                <div className="input-field">
                    <InputCustom type='text' label='Email' onChange={(value) => handleInput('email', value)} name="email" placeholder='Enter email' />
                </div>
                <div className="input-field">
                    <InputCustom type='text' label='Username' onChange={(value) => handleInput('username', value)} name="username" placeholder='Enter username' />
                </div>
                <div className="input-field">
                    <InputCustom type='password' label='Password' onChange={(value) => handleInput('password', value)} name="password" placeholder='Enter password' />
                </div>
                <div className="input-field">
                    <InputCustom type='password' label='Re-password' onChange={(value) => handleInput('repassword', value)} name="repassword" placeholder='Enter re-password' />
                </div>
            </form>
            <div className="input-field">
                <button className='button' type='button'>Register</button>
            </div>
            <div className="input-field">
                <Link to="/auth/login" className='link-text-new-account'>I already have an account</Link>
            </div>

        </div>
    )
}

export default Register
