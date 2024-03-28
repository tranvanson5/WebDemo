// FirebaseFileUploader.js

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebaseConfig";

const FirebaseFileUploader = async (imageUpload, name) => {
    if (!imageUpload) {
        console.error('No file selected.');
        return;
    }

    const storageRef = ref(storage, name ||"");
    await uploadBytes(storageRef, imageUpload);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
};

export default FirebaseFileUploader;
