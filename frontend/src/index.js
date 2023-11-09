import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// firebase 인스턴스 초기화 index.js에서 한 번만 해주면 됨.
import { initializeApp } from "firebase/app";
import firebaseConfig from './config/firebaseConfig.js';

// 여기서 초기화 하고 쓰고 싶은 곳에서 import
const app = initializeApp(firebaseConfig); 

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