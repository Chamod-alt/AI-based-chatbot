// src/services/ChatService.js
import {
    db,
    ref,
    push,
    update,
  } from '../firebase/firebaseConfig';
  import { GoogleGenerativeAI } from "@google/generative-ai";
  
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
  
  export const sendMessage = async (text, uid) => {
    if (!text.trim()) return;
  
    const userMessagesRef = ref(db, `chat/${uid}`);
  
    const userMessage = {
      role: 'user',
      text,
      timestamp: new Date().toISOString()
    };
    await push(userMessagesRef, userMessage);
  
    const pendingMessage = {
      role: 'assistant',
      text: '...',
      timestamp: new Date().toISOString()
    };
    const pendingRef = await push(userMessagesRef, pendingMessage);
  
    try {
      const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });
      const result = await model.generateContent(
        `You are a professional psychology counselor. Always respond with empathy, patience, and helpful advice.\nUser: ${text}\nAssistant:`
      );
      const reply = await result.response.text();
  
      const aiMessage = {
        role: 'assistant',
        text: reply,
        timestamp: new Date().toISOString()
      };
      await update(ref(db, `chat/${uid}/${pendingRef.key}`), aiMessage);
    } catch (err) {
      console.error("Gemini API error:", err);
    }
  };
  