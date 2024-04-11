import InputCustom from "../../../../component/input/input/inputCustom";
import Dialog from "../../../../component/dialog/dialog";
import {useState} from "react";
import {postRequest} from "../../../../service/connectionRequest";
import {useNavigate} from "react-router-dom";

function ResetNewPassword() {
    const [form,setForm] = useState({});
    const navigate = useNavigate();
    const handleChange = (event) => {
        setForm({ ...form, [event.name]: event.value }); // Update specific field
    };
    const handleSubmit = async () => {
        try {
            if (form?.password !== form?.repassword) {
                throw new Error("Passwords do not match");
            }
            await postRequest(`http://localhost:8080/auth/forgot-password/change-password`, null, { password: form?.password });
            console.log("Password reset request sent:", form?.password);
            alert("Password reset request sent successfully! (Replace with appropriate feedback)");
            navigate('/auth/login')
        } catch (error) {
            console.error("Error resetting password:", error);
            alert("An error occurred while resetting your password. Please try again later.");
        }
    };

    return (
        <div className='forgot-password-container'>
            <div>
                <h3>Change new password</h3>
            </div>
            <InputCustom
                label='Password'
                placeholder='Enter password'
                type='password'
                name='password'
                onChange={handleChange} // Use the correct handler name
            />
            <br></br>
            <InputCustom
                label='Re-password'
                placeholder='Enter re-password'
                name='repassword'
                type='password'
                onChange={handleChange} // Use the correct handler name
            />
            <p style={{textAlign: "center", marginTop: "40px"}}>
                <button onClick={handleSubmit} className='button'>Submit</button>
            </p>
        </div>
    )
}

export default ResetNewPassword;