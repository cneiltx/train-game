import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  signInWithRedirect,
} from "firebase/auth";
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

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firestoreDB = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);

export const signInWithGoogle = () => {
  console.log("Signing in with Google.");
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  return signInWithRedirect(firebaseAuth, googleProvider);
};

export const registerWithEmailAndPassword = (name: string, avatarFile: File, email: string, password: string) => {
  console.log(`Registering new user ${email}.`);
  return createUserWithEmailAndPassword(firebaseAuth, email, password)
    .then((cred) => {
      updateName(name);
      return cred;
    })
    .then((cred) => {
      updateAvatar(avatarFile);
      return cred;
    });
}

export const sendPasswordReset = (email: string) => {
  sendPasswordResetEmail(firebaseAuth, email)
    .then(() => console.log("Password reset link sent."))
    .catch((err) => {
      console.error(err);
    });
};

export const logout = () => {
  console.log(`Signing out user ${firebaseAuth.currentUser?.email}`);
  return signOut(firebaseAuth);
};

export const updateName = (name: string) => {
  if (firebaseAuth.currentUser) {
    console.log(`Updating username to ${name}`);
    return updateProfile(firebaseAuth.currentUser, {
      displayName: name
    });
  } else {
    return new Promise(() => {
      throw new Error("There is no logged in user");
    });
  }
}

export const updateAvatar = (avatarFile: File): Promise<string> => {
  const user = firebaseAuth.currentUser;
  if (user) {
    const prevPhotos = ref(firebaseStorage, `/user/${user.uid}/`);
    const newPhoto = ref(firebaseStorage, `/user/${user.uid}/profile-picture${avatarFile.name.substring(avatarFile.name.lastIndexOf("."))}`);
    console.log(`Updating avatar to ${avatarFile.name}.`);

    return listAll(prevPhotos)
      .then((files) => {
        Promise.all(
          files.items.filter((file) => file.name.startsWith("profile-picture.")).map((file) => {
            console.log(`Deleting file ${file.fullPath}.`);
            return deleteObject(file);
          })
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
      throw new Error("There is no logged in user.");
    });
  }
}