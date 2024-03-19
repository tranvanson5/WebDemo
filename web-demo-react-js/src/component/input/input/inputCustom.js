import React, { useState } from 'react';
import './inputCustom.css';

function InputCustom({ value, onChange, placeholder = 'Enter text', label = '', style = {}, type = 'text', name = '' }) {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        onChange({ name, value });
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
                />
                {
                    type === 'password' && (
                        <button onClick={toggleShowPassword} type='button'>
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    )
                }
            </div>
        </>

    );
}

export default InputCustom;
