import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDtTooLGJuVrNsIp0lV9ZV094oJNMEQYrU",
  authDomain: "rolo-contacts.firebaseapp.com",
  projectId: "rolo-contacts",
  storageBucket: "rolo-contacts.firebasestorage.app",
  messagingSenderId: "94289868614",
  appId: "1:94289868614:web:1e769c66b4c6428deed747",
  measurementId: "G-WE3JQL5G2F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app; 