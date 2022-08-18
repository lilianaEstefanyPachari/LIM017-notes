import { 
  createUserWithEmailAndPassword, 
  sendEmailVerification,
  signInWithEmailAndPassword,
  onAuthStateChanged
 } from "firebase/auth";
import { auth } from './firebaseConfig.js';
export {onAuthStateChanged, auth}

export const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const sendEmail = () => {
  sendEmailVerification(auth.currentUser)
  .then(() => {
    console.log('Email verification sent!')
  });
}

export const signInUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

// export  const userAuthState = () => {
//   return onAuthStateChanged(auth, (user) => {
//     if (user) {
//       console.log(user)
      // const uid = user.uid;
//     } else {
//       console.log('User is signed out'); 
//     }
//   });
// }