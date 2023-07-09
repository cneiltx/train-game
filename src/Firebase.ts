import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  signInWithRedirect,
  getRedirectResult,
  UserCredential,
} from 'firebase/auth';
import {
  getFirestore,
} from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage";

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

export const signInWithGoogle = async () => {
  console.log('Signing in with Google');
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  //return signInWithPopup(auth, googleProvider);
  signInWithRedirect(auth, googleProvider);
};

export const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    //handleErr(err);
  }
}

export const registerWithEmailAndPassword = (name: string, avatarFile: File, email: string, password: string) => {
  console.log(`Registering new user ${email}`);
  createUserWithEmailAndPassword(auth, email, password)
    .then((credential) => {
      const user = credential.user;

      console.log(`Registered user ${credential.user.email}`);
    })
    .catch((err) => console.error(err));
}

export const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    //handleErr(err);
  }
};

export const logout = () => {
  console.log(`Signing out user ${auth.currentUser?.email}`);
  return signOut(auth);
};

export const updateName = (name: string) => {
  if (auth.currentUser) {
    return updateProfile(auth.currentUser, {
      displayName: name
    });
  } else {
    return new Promise(() => {
      throw new Error('There is no logged in user');
    });
  }
}

export const updateAvatar = (avatarFile: File): Promise<string> => {
  const user = auth.currentUser;
  if (user) {
    const prevPhotos = ref(storage, `/user/${user.uid}/profile-picture.*`);
    const newPhoto = ref(storage, `/user/${user.uid}/profile-picture${avatarFile.name.substring(avatarFile.name.lastIndexOf('.'))}`);

    return listAll(prevPhotos)
      .then((files) => {
        Promise.all(
          files.items.map((file) => deleteObject(file))
        );
      })
      .then(() => uploadBytes(newPhoto, avatarFile))
      .then(() => getDownloadURL(newPhoto))
      .then((url) => {
        updateProfile(user, {
          photoURL: url,
        });
        return url;
      });
  } else {
    return new Promise(() => {
      throw new Error('There is no logged in user');
    });
  }
}