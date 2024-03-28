import React from 'react';
import './radioInput.css';

const RadioInput = ({ label ="", checkedValue, onChange, datas = [], disabled = false }) => { // Move disabled into the props object
    const handleChange = (event) => {
        const { value } = event.target;
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <div className="radio-input-container">
            <p>{label}</p>
            <span>
        {datas.map((data, index) => (
            <div key={index}>
                <input
                    type="radio"
                    name={label}
                    value={data?.value}
                    checked={checkedValue === data?.value}
                    onChange={handleChange}
                    disabled={disabled}
                />
                <label>{data?.title}</label>
            </div>
        ))}
      </span>
        </div>
    );
};

export default RadioInput;
