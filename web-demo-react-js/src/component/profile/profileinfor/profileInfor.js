import React, { useState } from 'react'
import './profileInfor.css'
import InputCustom from '../../input/input/inputCustom';
import Checkbox from '../../input/checkbox/checkbox';
import RadioInput from '../../input/radio/radioInput';
function ProfileInfor() {
  const [form, setForm] = useState({});

  const handleInput = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  console.log(form);
  return (
    <div>
      <div className="input-field">
        <InputCustom type='text' label='Name' onChange={(value) => handleInput('name', value)} name="name" placeholder='Enter name' />
      </div>
      <div className="input-field">
        <InputCustom type='date' label='Birthday' onChange={(value) => handleInput('birthday', value)} name="birthday" placeholder='Enter birthday' />
      </div>
      <div className="input-field">
        <InputCustom type='text' label='Phone' onChange={(value) => handleInput('phone', value)} name="phone" placeholder='Enter number phone' />
      </div>
      <div className="input-field">
        <InputCustom type='text' label='Address' onChange={(value) => handleInput('address', value)} name="address" placeholder='Enter address' />
      </div>

    </div>
  )
}

export default ProfileInfor;
