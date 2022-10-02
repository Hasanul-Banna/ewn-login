import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { ActionType } from "./helpers";

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

const firebaseLogin = async (email: string, password: string): Promise<any> => {
  return signInWithEmailAndPassword(auth, email, password);
};

const sendForgetPassEmail = async (email: string): Promise<any> => {
  return sendPasswordResetEmail(auth, email);
};

const firebaseRegistration = async (
  { email, password, name },
  dispatch: React.Dispatch<ActionType>,
): Promise<any> => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(async () => {
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      // console.log(result);
      dispatch({
        type: "success",
        payload: "auth/Registration Success, Please Login",
      });
    })
    .catch((error) => {
      dispatch({
        type: "error",
        payload: error.code,
      });
    });
};

export { firebaseLogin, sendForgetPassEmail, firebaseRegistration };
