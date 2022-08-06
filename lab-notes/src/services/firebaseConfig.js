// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaAysLXcc0EDtXL-ECC_6hS3BwoS6X0hM",
  authDomain: "cotton-notes.firebaseapp.com",
  projectId: "cotton-notes",
  storageBucket: "cotton-notes.appspot.com",
  messagingSenderId: "388804807486",
  appId: "1:388804807486:web:5b7035615d4a8181b57a6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
