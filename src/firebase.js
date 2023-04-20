import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const app=firebase.initializeApp({
    apiKey:'AIzaSyBiTqnfdDwvBgGXO3YyX8XURZTpztkvNKY',
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN ,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
});


export const auth=app.auth()
export default app;
