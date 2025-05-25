// src/lib/firebase-config.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyCxMIGHGsku_AMp0LsXZlsgFA1lMBy6Ef4",
  authDomain: "snaprecipe-4woms.firebaseapp.com",
  projectId: "snaprecipe-4woms",
  storageBucket: "gs://snaprecipe-4woms.firebasestorage.app",
  messagingSenderId: "1067227776613",
  appId: "1:1067227776613:web:1919ab78477b268be2688c",
  measurementId: "G-GB999R5R4K" // Optional, for Google Analytics
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);

export { app, auth };
