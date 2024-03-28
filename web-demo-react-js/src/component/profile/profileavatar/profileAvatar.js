import React, { useEffect, useState } from 'react';
import ImageAvatar from '../../image/imageavatar/imageAvatar';
import {useDispatch, useSelector} from "react-redux";
import 'firebase/compat/storage';
import {postRequest} from "../../../service/connectionRequest";
import { userSuccess} from "../../../store/slice/authSlice";
import FirebaseFileUploader from "../../image/firebase/uploadFirebase";
import {toast} from "react-toastify";


function ProfileAvatar() {
    const dispatch = useDispatch();
    const user = useSelector(state => state?.auth?.login?.user);
    const jwt = useSelector(state => state?.auth?.login?.accessToken);
    const [file, setFile] = useState(null);
    useEffect(() => {
        if (file) {
            handleUploadFirebase(); // Call handleUploadFirebase when a file is selected
        }
    }, [file]);

    const handleUploadFirebase = async () => {
        try {
            if (!file) {
                console.error('No file selected.');
                return;
            }
            const name= `images/${Date.now()}_${file.name}`;

            const downloadURL = await FirebaseFileUploader(file,name);
    
            await postRequest("http://localhost:8080/profile/upload/avatar", jwt, { avatar: downloadURL });

            const newUser = { ...user, avatar: downloadURL };
            dispatch(userSuccess(newUser));
            toast.success("Upload image success")
        
        } catch (error) {
            console.error('Error uploading file to Firebase:', error);
            toast.error("Upload image failed")
        }
    }
    
    const onChangeHandle = (value) => {
        setFile(value); // Set the selected file when it changes
    }
    return (
        <>
            {user && (
                <ImageAvatar urlImage={user?.avatar} onChange={onChangeHandle} />
            )}
        </>
    );
}

export default ProfileAvatar;
