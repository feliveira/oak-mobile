// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyA6rCwuL5Ac2HfLJuy4vEdd4N0QuaqtlmI",

  authDomain: "oak-web-75c21.firebaseapp.com",

  projectId: "oak-web-75c21",

  storageBucket: "oak-web-75c21.appspot.com",

  messagingSenderId: "134063676018",

  appId: "1:134063676018:web:3c3cab4190b2d1083040eb"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;