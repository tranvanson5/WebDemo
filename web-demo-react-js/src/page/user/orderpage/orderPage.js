import React, { useState } from 'react';
import './orderPage.css';

const OrderPage = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [note, setNote] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <h1>Order Page</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <label htmlFor="phone">Phone:</label>
                <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <label htmlFor="note">Note:</label>
                <textarea type="text"
                    id="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />


                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default OrderPage;