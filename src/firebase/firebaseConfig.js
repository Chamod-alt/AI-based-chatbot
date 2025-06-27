
//Importing Firebase Functions
import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  push,
  onValue,
  onChildAdded,
  get,
  query,
  limitToLast,
  remove,
  update,
  child,
  onChildChanged,
  onChildRemoved,
} from 'firebase/database';
import { getAuth } from 'firebase/auth';
// Firebase Project Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBxd778T6RPeeiYO-zoEd522qrGUIMZnY4",
    authDomain: "chatbot-64275.firebaseapp.com",
    projectId: "chatbot-64275",
    storageBucket: "chatbot-64275.firebasestorage.app",
    messagingSenderId: "970800393996",
    appId: "1:970800393996:web:ac1f2d776724001d21e329",
    measurementId: "G-42G4KN8ZJ6"
};
// Initializing Firebase App
const app = initializeApp(firebaseConfig);
// Exporting Services
export const db = getDatabase(app);
export const auth = getAuth(app);
// Exporting Realtime Database Utilities
export { ref, push, onValue, onChildAdded, get, query, limitToLast, remove, update, child,onChildChanged, onChildRemoved };
