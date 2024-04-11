import React, { useEffect, useState } from 'react';
import './loginForm.css'; // Import CSS file
import '../../button/buttonCustom.css'; // Import CSS file for button styling
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa';
import InputCustom from '../../input/input/inputCustom';
import {getRequest, postRequest} from "../../../service/connectionRequest";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, userSuccess } from "../../../store/slice/authSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";

const googleClientId = "207549995526-54ei4m6e3d2uk59dmhcj05k5cr3868n6.apps.googleusercontent.com";

function LoginForm() {
    const navigate = useNavigate();
    const login = useSelector(state => state?.auth?.login);
    const dispatch = useDispatch();
    const [form, setForm] = useState({ username: "", password: "" });

    const handleInput = (value) => {
        setForm({ ...form, [value.name]: value.value });
    };

    const handleSubmit = async () => {
        try {
            const api = `http://localhost:8080/auth/signin`;
            const response = await postRequest(api, null, form);
            dispatch(loginSuccess(response));
            await getProfile(response?.accessToken);
            navigate('../../');
            toast.success('Đăng nhập thành công!');
        } catch (error) {
            toast.error('Đăng nhập thất bại!');
            console.error("Error:", error);
        }
    };


    const getProfile = async (jwt) => {
        try {
            const response = await getRequest("http://localhost:8080/profile/get", jwt);
            dispatch(userSuccess(response));
        } catch (error) {
            console.error("Error:", error);
            toast.error('Load user thất bại');
        }
    };


    const handleLoginGoogle = async (response) => {
        try {
            const result = await postRequest('http://localhost:8080/auth/oauth/google',null,{idToken:response.credential})
            dispatch(loginSuccess(result));
            await getProfile(response?.accessToken);
            navigate('../../');
            toast.success('Đăng nhập thành công!');
        }catch (error) {
            toast.error('Đăng nhập thất bại!');
            console.error("Error:", error);
        }
    };
    return (
        <>
            <div className='login-form-container'>
                <p className="login-title">Login</p>
                <form>
                    <div className="input-field">
                        <InputCustom
                            type='text'
                            label='Username'
                            onChange={(value) => handleInput(value)}
                            name="username"
                            placeholder='Enter username'
                        />
                    </div>
                    <div className="input-field">
                        <InputCustom
                            type='password'
                            label='Password'
                            onChange={(value) => handleInput(value)}
                            name="password"
                            placeholder='Enter password'
                        />
                    </div>
                </form>
                <div className="input-field">
                    <button className='button' type='button' onClick={handleSubmit}>Login</button>
                </div>
                <div className="input-field">
                    <Link to="/auth/register" className='link-text-new-account'>Do not have an account?</Link>
                    <Link to="/auth/forgot-password" className='forgot-password'>Forgot password?</Link>
                </div>
                <div className="login-other-container">
                    <p className="login-other-title">-- Or signin with --</p>
                    <div className="login-other-links">
                        {/*<label htmlFor="GoogleLogin" className="login-other-link">*/}
                        {/*    <FaGoogle/>*/}
                        {/*</label>*/}
                        <GoogleOAuthProvider clientId={googleClientId}>
                            <GoogleLogin
                                clientId={googleClientId}
                                buttonText="Login with Google"
                                onSuccess={handleLoginGoogle}
                                onError={(error) => console.error(error)}
                            />
                        </GoogleOAuthProvider>

                        <Link to="#" className="login-other-link"><FaFacebookF/></Link>
                        <Link to="#" className="login-other-link"><FaGithub/></Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginForm;
