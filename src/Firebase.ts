import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAUu85QZQCJ0bk1sYDOKpxkg6AJIk-ka3I",
  authDomain: "train-game-e75ed.firebaseapp.com",
  projectId: "train-game-e75ed",
  storageBucket: "train-game-e75ed.appspot.com",
  messagingSenderId: "901391741387",
  appId: "1:901391741387:web:c98c11f7a944b3d774c64e",
  measurementId: "G-GF96D4XCFT"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

const handleErr = (err: any) => {
  console.error(err);
}

export const signInWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  try {
    const res = await signInWithPopup(auth, googleProvider);
    // const user = res.user;
    // const q = query(collection(db, "users"), where("uid", "==", user.uid));
    // const docs = await getDocs(q);
    // if (docs.docs.length === 0) {
    //   await addDoc(collection(db, "users"), {
    //     uid: user.uid,
    //     name: user.displayName,
    //     authProvider: "google",
    //     email: user.email,
    //     verified: user.emailVerified,
    //     photoUrl: user.photoURL,
    //   });
    // }
  } catch (err) {
    handleErr(err);
  }
};

export const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    handleErr(err);
  }
};

export const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    handleErr(err);
  }
};

export const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    handleErr(err);
  }
};

export const logout = () => {
  signOut(auth);
};