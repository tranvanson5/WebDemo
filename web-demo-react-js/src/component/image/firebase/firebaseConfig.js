// firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAQ5KCYDUl46ueHkiBuadmdSYN39GtKFlE",
    authDomain: "webdemostorage.firebaseapp.com",
    projectId: "webdemostorage",
    storageBucket: "webdemostorage.appspot.com",
    messagingSenderId: "25719604166",
    appId: "1:25719604166:web:3809ddc60e3a378077e8c7",
    measurementId: "G-7S68SM1EPR"
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export { storage };