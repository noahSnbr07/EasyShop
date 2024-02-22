import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
const key = import.meta.env.VITE_FIREBASE_KEY;
const firebaseConfig = {
    apiKey: key,
    authDomain: "e-commerce-ef226.firebaseapp.com",
    projectId: "e-commerce-ef226",
    storageBucket: "e-commerce-ef226.appspot.com",
    messagingSenderId: "530210003713",
    appId: "1:530210003713:web:13ad9a517ea930700b5900",
    measurementId: "G-WJWCB2FF9D"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth }