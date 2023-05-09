import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbbqp-hTRNVKZ57TFaOIOFzXlCzPInm1s",
  authDomain: "cattyshopapp.firebaseapp.com",
  projectId: "cattyshopapp",
  storageBucket: "cattyshopapp.appspot.com",
  messagingSenderId: "116793579803",
  appId: "1:116793579803:web:3c632e4e467a2743181bbe",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const authorization = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(authorization, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (authorizedUser) => {
  const userDocRef = doc(db, "users", authorizedUser.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = authorizedUser;
    const creationDate = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        creationDate,
      });
    } catch (error) {
      console.log("error while creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(authorization, email, password);
};
