import { initializeApp } from "firebase/app";
import { getFirestore }from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBYAloeYDtv84SAmEDJyGS-9rQUB6Q7gtQ",
  authDomain: "docs-36a9c.firebaseapp.com",
  projectId: "docs-36a9c",
  storageBucket: "docs-36a9c.appspot.com",
  messagingSenderId: "329544438886",
  appId: "1:329544438886:web:293318c0ecfef952d709a7"
};


export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);