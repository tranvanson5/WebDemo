import React, {useEffect, useState} from 'react';
import './imageAvatar.css';

const imageUrlDefault = "https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.300.jpg";

function ImageAvatar({ onChange, urlImage}) {
    const [selectedImage, setSelectedImage] = useState( null);

    useEffect(() => {
        const setImage = async () => {
            if (urlImage){
                setSelectedImage(urlImage);
            }else{
                setSelectedImage(imageUrlDefault);
            }
        };
        setImage();
    }, [urlImage]);
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            onChange(file)
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
