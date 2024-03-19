import React, { useState } from 'react';
import './loginForm.css'; // Import CSS file
import '../../button/buttonCustom.css'; // Import CSS file for button styling
import { Link } from 'react-router-dom';
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa';
import InputCustom from '../../input/input/inputCustom';

function LoginForm() {
    const [form, setForm] = useState({});

    const handleInput = (name, value) => {
        setForm({ ...form, [name]: value });
    };

    console.log(form);

    return (
        <div className='login-form-container'> {/* Set className for the container */}
            <p className="login-title">Login</p> {/* Set className for the login title */}
            <form>
                <div className="input-field">
                    <InputCustom type='text' label='Username' onChange={(value) => handleInput('username', value)} name="username" placeholder='Enter username'/>
                </div>
                <div className="input-field">
                    <InputCustom type='password' label='Password' onChange={(value) => handleInput('password', value)} name="password" placeholder='Enter password'/>
                </div>
            </form>
            <div className="input-field">
                <button className='button' type='button'>Login</button>
            </div>
            <div className="input-field">
                <Link to="/auth/register" className='link-text-new-account'>Do not have an account?</Link>
                <Link to="#" className='forgot-password'>Forgot password?</Link>
            </div>
            <div className="login-other-container">
                <p className="login-other-title">-- Or signin with --</p>
                <div className="login-other-links">
                    <Link to="#" className="login-other-link"><FaGoogle /></Link>
                    <Link to="#" className="login-other-link"><FaFacebookF /></Link>
                    <Link to="#" className="login-other-link"><FaGithub /></Link>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
