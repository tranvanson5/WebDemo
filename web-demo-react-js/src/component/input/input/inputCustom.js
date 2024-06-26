import React, { useState } from 'react';
import './inputCustom.css';
import {IoMdEye, IoMdEyeOff} from "react-icons/io";

function InputCustom({ value, onChange, placeholder = 'Enter text', label = '', style = {}, type = 'text', name = '', disabled = false }) {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        onChange({ name, value }); // Pass name and value as an object
    };

    return (
        <>
            {label && <label className="custom-label">{label}</label>}

            <div className="input-custom-wrapper" style={style}>
                <input
                    type={type === 'password' && showPassword ? 'text' : type}
                    value={value}
                    onChange={handleChange}
                    className="custom-input"
                    placeholder={placeholder}
                    name={name}
                    disabled={disabled}
                />
                {
                    type === 'password' && (
                        <button onClick={toggleShowPassword} type='button' style={{color:"black", justifyContent:"center", display:"flex"}}>
                            {showPassword ? <IoMdEye />: <IoMdEyeOff /> }
                        </button>
                    )
                }
            </div>
        </>

    );
}

export default InputCustom;
