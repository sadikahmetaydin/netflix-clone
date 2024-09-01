import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBmhnsmoaLd8zzNIyq7xdf2DFeAhkyAMXE",
  authDomain: "netflix-clone-8325d.firebaseapp.com",
  projectId: "netflix-clone-8325d",
  storageBucket: "netflix-clone-8325d.appspot.com",
  messagingSenderId: "813807905490",
  appId: "1:813807905490:web:956f4fe7831b7bd047db0b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const singup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
}

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    toast.error(error.code.split('/')[1].split('-').join(" "))
    // toast.error(error.code)
  }
}

const logout = () => {
  signOut(auth);
}

export { auth, db, login, singup, logout };