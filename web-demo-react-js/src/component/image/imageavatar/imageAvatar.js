import React, { useState } from 'react';
import './imageAvatar.css';

function ImageAvatar({ onChange, urlImage = imageUrlDefault }) {
    const [selectedImage, setSelectedImage] = useState(urlImage || null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                // Gọi hàm onChange và truyền URL của hình ảnh đã chọn
                onChange(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="image-avatar-container">
            <label htmlFor="avatar-input" className="image-input-label">Upload</label>
            <input
                id="avatar-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="image-input"
            />
            {selectedImage && (
                <img src={selectedImage} alt="Avatar" className="avatar-image" />
            )}
        </div>

    );
}

export default ImageAvatar;

const imageUrlDefault= "https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.300.jpg";