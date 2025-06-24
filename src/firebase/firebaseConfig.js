// src/firebase/firebaseConfig.js
/*import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBxd778T6RPeeiYO-zoEd522qrGUIMZnY4",
    authDomain: "chatbot-64275.firebaseapp.com",
    projectId: "chatbot-64275",
    storageBucket: "chatbot-64275.firebasestorage.app",
    messagingSenderId: "970800393996",
    appId: "1:970800393996:web:ac1f2d776724001d21e329",
    measurementId: "G-42G4KN8ZJ6"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, push, onValue };
*/

// src/firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue, remove, update } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBxd778T6RPeeiYO-zoEd522qrGUIMZnY4",
    authDomain: "chatbot-64275.firebaseapp.com",
    projectId: "chatbot-64275",
    storageBucket: "chatbot-64275.firebasestorage.app",
    messagingSenderId: "970800393996",
    appId: "1:970800393996:web:ac1f2d776724001d21e329",
    measurementId: "G-42G4KN8ZJ6"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 👇 Add remove and update to the export list
export { db, ref, push, onValue, remove, update };
