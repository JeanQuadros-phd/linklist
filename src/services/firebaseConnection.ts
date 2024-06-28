
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBUI5uepsf7XHbH421CIGw5jIcWpA1Ob0Q",
  authDomain: "curso-teste1.firebaseapp.com",
  projectId: "curso-teste1",
  storageBucket: "curso-teste1.appspot.com",
  messagingSenderId: "743179748016",
  appId: "1:743179748016:web:5c67ed494017d91b317175",
  measurementId: "G-5KHEY0SNP4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app);


export {auth, db};