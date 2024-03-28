import React, { useEffect, useState } from 'react';
import './profileInfor.css';
import InputCustom from '../../input/input/inputCustom';
import RadioInput from '../../input/radio/radioInput';
import { useDispatch, useSelector } from "react-redux";
import { postRequest } from "../../../service/connectionRequest";
import {userSuccess} from "../../../store/slice/authSlice";
import {toast} from "react-toastify";

function ProfileInfor() {
    const dispatch = useDispatch();
    const user = useSelector(state => state?.auth?.login?.user);
    const jwt = useSelector(state => state?.auth?.login?.accessToken);
    const [isUpdate, setIsUpdate] = useState(false);
    const [form, setForm] = useState({});

    useEffect(() => {
        copyUserToForm();
    }, [user]);

    const copyUserToForm = () => {
        user && setForm(prevState => ({ ...prevState, ...user }));
    }

    const handleInput = (value) => {
        setForm({ ...form, [value.name]: value.value });
    };

    const handleGenderChange = (value) => {
        setForm({ ...form, gender: value }); // Update selected gender
    };

    const onSubmit = async () => {
        try {
            setIsUpdate(false); // Reset isUpdate state
            await postRequest("http://localhost:8080/profile/upload", jwt, form); // Perform POST request
            dispatch(userSuccess(form))
            toast.success("Upload information success!!!")
        } catch (error) {
            console.error("Error:", error);
            toast.success("Upload information failed")
        }
    };

    const onCancel = () => {
        try {
            setIsUpdate(false);
            copyUserToForm();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const datasGender = [
        { title: 'Male', value: 'MALE' },
        { title: 'Female', value: 'FEMALE' },
        { title: 'Other', value: 'OTHER' }
    ];

    return (
        <div className="profile-infor-container">
            <div className="input-field">
                <p className="title-text">Profile</p>
            </div>
            <form>
                <div className="input-field">
                    <InputCustom type='text' label='Name' onChange={(value) => handleInput( value)} name="name"
                                 value={form.name || ''} placeholder='Enter name' disabled={!isUpdate} />
                </div>

                <div className="input-field">
                    <RadioInput label='Gender' datas={datasGender} checkedValue={form.gender || ''} onChange={handleGenderChange} disabled={!isUpdate} />
                </div>

                <div className="input-field">
                    <InputCustom type='date' label='Birthday' onChange={(value) => handleInput( value)}
                                 name="dob" value={form.dob || ''} placeholder='Enter birthday' disabled={!isUpdate} />
                </div>

                <div className="input-field">
                    <InputCustom type='text' label='Phone' onChange={(value) => handleInput(value)}
                                 name="phone" value={form.phone || ''} placeholder='Enter number phone' disabled={!isUpdate} />
                </div>

                <div className="input-field">
                    <InputCustom type='text' label='Address' onChange={(value) => handleInput( value)}
                                 name="address" value={form.address || ''} placeholder='Enter address' disabled={!isUpdate} />
                </div>
            </form>

            <div className="input-field button-container">
                {
                    isUpdate === false ? (
                        <button onClick={() => setIsUpdate(!isUpdate)} className="btn-submit" style={{ backgroundColor: "#28A745" }}>Edit</button>
                    ) : (
                        <>
                            <button onClick={onSubmit} className="btn-submit" disabled={!isUpdate}>Save</button>
                            <button onClick={onCancel} className="btn-submit"
                                    style={{ backgroundColor: "#C82333" }} disabled={!isUpdate}>Cancel
                            </button>
                        </>
                    )
                }
            </div>

        </div>
    );
}

export default ProfileInfor;
