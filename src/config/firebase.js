// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqgPajJhlRcNA45wqhfy-dKt6hk8X4034",
  authDomain: "react-mt-auth.firebaseapp.com",
  projectId: "react-mt-auth",
  storageBucket: "react-mt-auth.appspot.com",
  messagingSenderId: "428007485501",
  appId: "1:428007485501:web:c6ad5b6d66212323997a54",
  measurementId: "G-GC3KEZMR5S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// export { db };
