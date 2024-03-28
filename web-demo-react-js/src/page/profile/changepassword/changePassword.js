import React, { useEffect, useState } from 'react';
import './changePassword.css';
import InputCustom from "../../../component/input/input/inputCustom";
import { postRequest } from "../../../service/connectionRequest";
import { useSelector } from "react-redux";
import {toast} from "react-toastify";

function ChangePassword() {
    const jwt = useSelector(state => state?.auth?.login?.accessToken);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [isValidForm, setIsValidForm] = useState(false);

    useEffect(() => {
        validateForm();
    }, [form]);

    const handleInput = (value) => {
        setForm({ ...form, [value.name]: value.value });
        setErrors({ ...errors, [value.name]: '' });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!form.oldPassword) {
            newErrors.oldPassword = "Old password is required";
            isValid = false;
        }

        if (!form.newPassword) {
            newErrors.newPassword = "New password is required";
            isValid = false;
        }

        if (!form.reNewPassword) {
            newErrors.reNewPassword = "Please re-enter new password";
            isValid = false;
        } else if (form.newPassword !== form.reNewPassword) {
            newErrors.reNewPassword = "Passwords do not match";
            isValid = false;
        }

        setErrors(newErrors);
        setIsValidForm(isValid);
    };

    const handleSubmit = async () => {
        try {
            await postRequest("http://localhost:8080/profile/change-password", jwt, form);
            toast.success("Change password success!!!")
        } catch (error) {
            toast.error("Change password cancel!!!!")
            console.error('Error occurred while changing password:', error);
        }
    };

    return (
        <div className="change-password-container">
            <p className="change-password-title">Change password</p>
            <form>
                <div className="input-field">
                    <InputCustom
                        type='password'
                        label='Old password'
                        onChange={(value) => handleInput(value)}
                        name="oldPassword"
                        placeholder='Enter old password'
                    />
                    {errors.oldPassword && <p className="error-message">{errors.oldPassword}</p>}
                </div>
                <div className="input-field">
                    <InputCustom
                        type='password'
                        label='New password'
                        onChange={(value) => handleInput(value)}
                        name="newPassword"
                        placeholder='Enter new password'
                    />
                    {errors.newPassword && <p className="error-message">{errors.newPassword}</p>}
                </div>
                <div className="input-field">
                    <InputCustom
                        type='password'
                        label='Re-enter new password'
                        onChange={(value) => handleInput(value)}
                        name="reNewPassword"
                        value={form.reNewPassword || ''}
                        placeholder='Re-enter new password'
                    />
                    {errors.reNewPassword && <p className="error-message">{errors.reNewPassword}</p>}
                </div>
                <div className="input-field button-container">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="btn-submit"
                        style={{opacity:!isValidForm?"0.5":"1"}}
                        disabled={!isValidForm}
                    >
                        Save new password
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ChangePassword;
