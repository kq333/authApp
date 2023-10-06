import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC67P3C0Ygs0tZ5-1sfQemvuVFNg-OGWlM',
  authDomain: 'auth-app-1911c.firebaseapp.com',
  projectId: 'auth-app-1911c',
  storageBucket: 'auth-app-1911c.appspot.com',
  messagingSenderId: '233953448674',
  appId: '1:233953448674:web:8936030e9bb0b388a784bb',
  measurementId: 'G-5990VZKYF7',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
