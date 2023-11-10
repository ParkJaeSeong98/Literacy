// firebase 인스턴스 초기화 index.js에서 한 번만 해주면 됨.
import { initializeApp } from "firebase/app";
import firebaseConfig from './config/firebaseConfig.js';

// 여기서 초기화 하고 쓰고 싶은 곳에서 import
const app = initializeApp(firebaseConfig); 

export default app;