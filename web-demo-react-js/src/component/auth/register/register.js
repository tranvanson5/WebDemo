import React, {useEffect, useState} from 'react';
import '../login/loginForm.css';
import {Link, useNavigate} from 'react-router-dom';
import {getRequest, postRequest} from '../../../service/connectionRequest';
import Dialog from "../../dialog/dialog";
import CountdownTimer from "../../timer/countdown/CountdownTimer";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const [time, setTime] = useState(60);
    const [restartCount, setRestartCount] = useState(0);
    const [canResend, setCanResend] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCanResend(true); // Allow resending after a period of time
        }, 60 * 1000);

        return () => clearTimeout(timer); // Cleanup timer
    }, [canResend]);

    const handleInput = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async () => {
        await postRequest('http://localhost:8080/auth/signup', null, form);
        toast.success("Send mail otp success")
        openModal();
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
        setCanResend(false); // Prevent resending while modal is open
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const reHandleSubmit = async () => {
        await postRequest('http://localhost:8080/auth/signup', null, form);
        setTime(60);
        setRestartCount(prevCount => prevCount + 1);
        toast.success("Send mail otp success")
        setCanResend(false); // Prevent resending while handling submit
    };
    const handleSubmitConfirmOtp = async () =>{
        await getRequest(`http://localhost:8080/auth/signup/verify?otp=${form?.otp||""}`,null);
        toast.success("Register account success");
        navigate("/auth/login")
    }

    return (
        <div className="login-form-container">
            <p className="login-title">Register</p>
            <form>
                <div className="input-field">
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Enter name" onChange={handleInput} />
                </div>
                <div className="input-field">
                    <label>Email</label>
                    <input type="text" name="email" placeholder="Enter email" onChange={handleInput} />
                </div>
                <div className="input-field">
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Enter username" onChange={handleInput} />
                </div>
                <div className="input-field">
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Enter password" onChange={handleInput} />
                </div>
                <div className="input-field">
                    <label>Re-password</label>
                    <input type="password" name="repassword" placeholder="Enter re-password" onChange={handleInput} />
                </div>
            </form>
            <div className="input-field">
                <button className="button" type="button" onClick={handleSubmit}>
                    Register
                </button>
            </div>
            <div className="input-field">
                <Link to="/auth/login" className="link-text-new-account">
                    I already have an account
                </Link>
            </div>
            <Dialog
                isOpen={isModalOpen} onRequestClose={closeModal}
                title="Confirm OTP" customStyles={{
                content: { maxWidth: '500px', height: '200px' },
                title: { textAlign: 'center' }
            }}>
                <div className="input-field"
                     style={{paddingLeft: "30px", paddingRight: "30px", boxSizing: "border-box"}}>
                    <p>OTP</p>
                    <input type="text" name="otp" placeholder="Enter otp" onChange={handleInput}
                           style={{width: "100%", height: "40px", outline: "none"}}/>
                    <p style={{display: "flex", justifyContent: "space-between"}}>
                        <CountdownTimer seconds={time} restart={restartCount}/>
                        {canResend && <a onClick={reHandleSubmit} style={{ cursor: "pointer" }}>Resend Otp?</a>}
                    </p>
                    <p style={{display: "flex", justifyContent: "center"}}>
                        <button className="button" type="button" onClick={handleSubmitConfirmOtp}>
                            Confirm Otp
                        </button>
                    </p>
                </div>
            </Dialog>
        </div>
    );
}

export default Register;
