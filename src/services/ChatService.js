// src/services/ChatService.js
import {
    db,
    ref,
    push,
    update,
  } from '../firebase/firebaseConfig';// db, ref, push, update methods import 
  import { GoogleGenerativeAI } from "@google/generative-ai"; // access gimini AI
  
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);// import API key
  //send message
  export const sendMessage = async (text, uid) => {
    if (!text.trim()) return;// check has a value or not
  
    const userMessagesRef = ref(db, `chat/${uid}`);
  // push user message
    const userMessage = {
      role: 'user',
      text,
      timestamp: new Date().toISOString()// add time and date
    };
    await push(userMessagesRef, userMessage);
  // gimini message time when pending
    const pendingMessage = {
      role: 'assistant',
      text: '...',// show pending time as ...
      timestamp: new Date().toISOString()// add time and date
    };
    const pendingRef = await push(userMessagesRef, pendingMessage);
  
    try { //load  gimini modle 
      const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });
      const result = await model.generateContent( // context of the promt
        `You are a professional psychology counselor. Always respond with empathy, patience, and helpful advice.\nUser: ${text}\nAssistant:`
      );
      const reply = await result.response.text(); // after appent, tell give a reply
  //update to real reply of gimini
      const aiMessage = {
        role: 'assistant',
        text: reply,
        timestamp: new Date().toISOString()// store date and time
      };
      await update(ref(db, `chat/${uid}/${pendingRef.key}`), aiMessage);
    } catch (err) {
      console.error("Gemini API error:", err);
    }
  };
  