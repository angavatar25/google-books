import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArT3VQrynaUkQ43Iym6lVNOzLusQ5TwMo",
  authDomain: "books-e517c.firebaseapp.com",
  projectId: "books-e517c",
  storageBucket: "books-e517c.firebasestorage.app",
  messagingSenderId: "288898218472",
  appId: "1:288898218472:web:21730c78e708eb5cc80c5d"
};

const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);

export default app;