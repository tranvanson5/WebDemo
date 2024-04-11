import './forgotPasswordPage.css';
import InputCustom from "../../../component/input/input/inputCustom";
import { useState } from "react";
import { getRequest } from "../../../service/connectionRequest";
import { toast } from "react-toastify";
import Dialog from "../../../component/dialog/dialog";
import CountdownTimer from "../../../component/timer/countdown/CountdownTimer";
import '../../../component/button/buttonCustom.css'
import {useNavigate} from "react-router-dom";
const customStyles= {
    content: {
        height:'300px',
        width: '500px'
    }
}
function ForgotPasswordPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isOpen, setIsOpen] = useState(false); // Initial state for Dialog
    const [resetTime, setResetTime] = useState(0); // Reset counter for resend

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleChange = (event) => {
        // Update state directly with event.target.value
        setEmail(event.value);
    };

    const handleSubmit = async () => {
        try {
            // Validate email before sending request
            if (!validateEmail(email)) {
                toast.error("Please enter a valid email address.");
                return;
            }

            await getRequest(
                `http://localhost:8080/auth/forgot-password?email=${email}`,
                null
            );

            // Handle successful response (e.g., display success message in Dialog)
            toast.success("Forgot password request sent successfully!");
            setIsOpen(true); // Open Dialog to display success message
            setResetTime(resetTime + 1); // Start reset timer for OTP
        } catch (error) {
            // Handle errors appropriately (e.g., display error message in Dialog)
            toast.error("Error sending forgot password request.");
            console.error(error);
            setIsOpen(true); // Open Dialog to display error message
        }
    };

    const handleChangeOtp = (event) => {
        setOtp(event.value);
    };

    const handleSubmitVerify = async () => {
        try {
            // Implement API call to verify OTP (replace with your actual API endpoint)
            await getRequest(
                `http://localhost:8080/auth/forgot-password/verify?otp=${otp||''}`,
                null
            );
            toast.success("OTP verified successfully!");

            navigate('/auth/forgot-password/change-password')

        } catch (error) {
            // Handle errors during OTP verification
            toast.error("Error verifying OTP.");
            console.error(error);
        }
    };

    const handleResendOtp = () => {
        setResetTime(resetTime + 1); // Increment resend counter
        handleSubmit(); // Resubmit forgot password request (may have time-based restrictions)
    };

    const inputForm = (
        <div style={{display: "flex", alignItems: "center", marginTop:"40px"}}>
            <div style={{width:"100%"}}>
                <InputCustom
                    label='Otp'
                    placeholder='Enter Otp'
                    type='text' // Use 'text' for OTP input (avoid email type)
                    onChange={handleChangeOtp}
                />
                <p style={{display: "flex", justifyContent: "space-between"}}>
                    <CountdownTimer seconds={1 * 60} restart={resetTime}></CountdownTimer>
                    <a
                        style={{cursor: "pointer", textDecoration: "underline"}}
                        onClick={handleResendOtp}
                        disabled={resetTime === 0} // Disable resend until timer completes
                    >
                        Resend otp
                    </a>
                </p>
                <p style={{textAlign:"center"}}>
                    <button onClick={handleSubmitVerify} className='button'>
                        Submit
                    </button>
                </p>
            </div>
        </div>

    );
    return (
        <div className='forgot-password-container'>
        <div>
                <h3>Forgot password</h3>
            </div>
            <InputCustom
                label='Email'
                placeholder='Enter email'
                type='email'
                onChange={handleChange} // Use the correct handler name
            />
            <p style={{textAlign: "center", marginTop: "40px"}}>
                <button onClick={handleSubmit} className='button'>Submit</button>
            </p>
            <Dialog
                isOpen={isOpen}
                onRequestClose={handleClose}
                title={'Confirm Otp'}
                children={inputForm}
                customStyles={customStyles}
            >
            </Dialog>
        </div>
    );
}

export default ForgotPasswordPage;

// Optional email validation function
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
