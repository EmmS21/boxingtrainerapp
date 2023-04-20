import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyDnnLmD-HL2YMnwzZaVDB_U4jXZQuJIIUg",
    authDomain: "boxingtrainer-63cb8.firebaseapp.com",
    projectId: "boxingtrainer-63cb8",
    storageBucket: "boxingtrainer-63cb8.appspot.com",
    messagingSenderId: "174836470324",
    appId: "1:174836470324:web:f6cc5816f5625b87397061",
    measurementId: "G-D9WCSFQJ0K"
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const dbRef = firebase.database().ref();

// dbRef.set({
//   name: 'Emmanuel Sibanda',
//   age: 33,
//   email: 'emmanuelsibanda21@gmail.com'
// });