import React from 'react';
import ReactDOM from 'react-dom/client';
import './client/index.css';
import App from './client/App';
import reportWebVitals from './client/reportWebVitals';
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgHYjrfaQ7RYeC4pQZ2eKmyhVaZdKvWgs",
  authDomain: "where-is-the-car.firebaseapp.com",
  projectId: "where-is-the-car",
  storageBucket: "where-is-the-car.appspot.com",
  messagingSenderId: "1026598715457",
  appId: "1:1026598715457:web:9c804030c095876d4f86c0",
  measurementId: "G-5WBECP9VCL"
};

// Initialize Firebase
/* eslint-disable */
const app = initializeApp(firebaseConfig);
/* eslint-enable */

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
