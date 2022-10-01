import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    sendPasswordResetEmail,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAFPuftkSykhDMN5gDPV7gMTTUTZjYKwDE",
    authDomain: "ewn-login.firebaseapp.com",
    projectId: "ewn-login",
    storageBucket: "ewn-login.appspot.com",
    messagingSenderId: "328850793237",
    appId: "1:328850793237:web:79dded9527a2b16241ff1c",
};
initializeApp(firebaseConfig);
const auth = getAuth();

const firebaseLogin = async (email, password): Promise<any> => {
    return await signInWithEmailAndPassword(auth, email, password)
}

const sendForgetPassEmail = (email): void => {
    sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log('success');
        })
        .catch((error) => {
            console.log(error.message, error.code);
        });
}

const firebaseRegistration = async ({ email, password, name }, setSignupErr): Promise<any> => {
    return await createUserWithEmailAndPassword(auth, email, password)
        .then(async (result) => {
            await updateProfile(auth.currentUser, {
                displayName: name,
            })
            console.log(result);
        }).catch((error) => {
            setSignupErr(error.code)
            console.log(error.code);
        });
};

export { firebaseLogin, sendForgetPassEmail, firebaseRegistration }