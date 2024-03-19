// Checkbox.js
import React from 'react';
import './checkbox.css';

const Checkbox = ({ label, checked, onChange, name }) => {
    const handleChange = (event) => {
        const { name, checked } = event.target; // Trích xuất name và checked từ sự kiện
        if (onChange) {
            onChange({ name, checked }); // Gửi lại object chứa name và checked qua hàm xử lý onChange
        }
    };

    return (
        <label className="checkbox-container">
            <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
                name={name}
            />
            <span className="checkmark"></span>
            {label}
        </label>
    );
};

export default Checkbox;
