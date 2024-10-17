// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9g1Q32QarHesB3WzYNsi0eh6jdF9aRVc",
  authDomain: "uml-plantas.firebaseapp.com",
  projectId: "uml-plantas",
  storageBucket: "uml-plantas.appspot.com",
  messagingSenderId: "10757116886",
  appId: "1:10757116886:web:3298ccede41a30bcaf8a77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export  {db};
export {storage};