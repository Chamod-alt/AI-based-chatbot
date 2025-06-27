
// src/components/ChatWindow.js

import React, { useEffect, useState, useRef } from 'react';
import Navbar from './Navbar';//import navbar

import {
  db,
  ref,
  push,
  update,
  remove,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  get,
  query,
  limitToLast,
} from '../firebase/firebaseConfig';// call firebace compornents
import { useAuth } from '../context/AuthProvider';//add auth provider
import ChatMessage from './ChatMessage';
import { GoogleGenerativeAI } from '@google/generative-ai';//gimini api
// AI behaviour
const persona = {
  role: 'Psychology Counselor',
  tone: 'Empathetic and calm',
  prompt: 'You are a professional psychology counselor. Always respond with empathy, patience, and helpful advice.',
};

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [darkMode, setDarkMode] = useState(false); // toggle mode
  const messagesEndRef = useRef(null);
  const { user } = useAuth();
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
//  Scroll to Bottom on Message Update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!user) return;

    const userChatRef = ref(db, `chat/${user.uid}`);
//Fetch last 50 messages from Firebase for the current user.
    const fetchHistory = async () => {
      const messagesRef = query(userChatRef, limitToLast(50));
      const snapshot = await get(messagesRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const history = Object.entries(data).map(([id, msg]) => ({ id, ...msg }));
        setMessages(history);
      }
    };

    fetchHistory();
// Listen for new messages in real time and append.
    onChildAdded(userChatRef, (snapshot) => {
      const newMessage = { id: snapshot.key, ...snapshot.val() };
      setMessages((prev) => {
        if (prev.find((m) => m.id === newMessage.id)) return prev;
        return [...prev, newMessage].slice(-50);
      });
    });
    //Update messages if modified
    onChildChanged(userChatRef, (snapshot) => {
      const updatedMessage = { id: snapshot.key, ...snapshot.val() };
      setMessages((prev) =>
        prev.map((msg) => (msg.id === updatedMessage.id ? updatedMessage : msg))
      );
    });
  // Remove deleted messages from UI.
    onChildRemoved(userChatRef, (snapshot) => {
      const deletedId = snapshot.key;
      setMessages((prev) => prev.filter((msg) => msg.id !== deletedId));
    });
  }, [user]);
//send message 
  const sendMessage = async () => {
    if (!input.trim() || !user) return;

    const userChatRef = ref(db, `chat/${user.uid}`);
//user message
    const userMessage = {
      role: 'user',
      text: input,
      timestamp: new Date().toISOString(),// add date
    };
    await push(userChatRef, userMessage);
//pending time in gimini
    const placeholderMsg = {
      role: 'assistant',
      text: '...',
      timestamp: new Date().toISOString(),//add date and time
    };
    const pendingRef = await push(userChatRef, placeholderMsg);

    const chatHistory = [...messages, userMessage]
      .filter((m) => m.role && m.text)
      .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
      .join('\n');

    try {
      const model = genAI.getGenerativeModel({ model: 'models/gemini-2.0-flash' });
      const result = await model.generateContent(`${persona.prompt}\n${chatHistory}\nAssistant:`);
      const reply = await result.response.text();
//update messgee
      await update(ref(db, `chat/${user.uid}/${pendingRef.key}`), {
        text: reply,
      });
    } catch (err) {
      console.error('Gemini API error:', err);
      alert('Gemini API Error. Check console.');
    }

    setInput('');
  };
// delete message
  const handleDelete = async (id) => {
    if (!user) return;
    await remove(ref(db, `chat/${user.uid}/${id}`));
  };
// update function
/*
  const handleUpdate = async (id, currentText) => {
    const newText = prompt('Edit your message:', currentText);
    if (newText && newText.trim()) {
      await update(ref(db, `chat/${user.uid}/${id}`), { text: newText });
    }
  };
*/
// update option 
const handleUpdate = async (id, newText) => {
  
  if (newText && newText.trim()) {
    await update(ref(db, `chat/${user.uid}/${id}`), { text: newText });
  }
};
// add date 
  const groupMessagesByDate = (msgs) => {
    return msgs.reduce((groups, msg) => {
      const date = new Date(msg.timestamp).toISOString().split('T')[0]; // yyyy-mm-dd
      if (!groups[date]) groups[date] = [];
      groups[date].push(msg);
      return groups;
    }, {});
  };

  const grouped = groupMessagesByDate(messages);




  return (
   <div>
    <Navbar />
   
    <div style={{ padding: "5px 22px", backgroundColor: darkMode ? '#1e1e1e' : '#f5f5f5', color: darkMode ? '#fff' : '#000' ,maxHeight:"100vh"}}>
      {/* Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          marginBottom: 4,
          padding: 8,
          backgroundColor: darkMode ? '#444' : '#ddd',
          color: darkMode ? '#fff' : '#000',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
        }}
      >
        {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
      </button>

      {/* Chat Box */}
      <div
        style={{
          height: '68vh',
          overflowY: 'scroll',
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
          backgroundColor: darkMode ? '#2c2c2c' : '#ffffff',
          border: '1px solid #ccc',
        }}
      >
        {Object.entries(grouped).map(([date, msgs]) => (
          <div key={date}>
            <div
              style={{
                textAlign: 'center',
                margin: '10px 0',
                fontWeight: 'bold',
                color: darkMode ? '#ddd' : '#333',
              }}
            >
              {date}
            </div>
            {msgs.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                darkMode={darkMode}
                onDelete={() => handleDelete(msg.id)}
                onUpdate={() => handleUpdate(msg.id, msg.text)}
              />
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Field */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message"
          style={{
            width: '75%',
            padding: 10,
            height: 40,
            resize: 'vertical',
            overflowY: 'auto',
            backgroundColor: darkMode ? '#333' : '#fff',
            color: darkMode ? '#fff' : '#000',
            border: '1px solid #ccc',
            borderRadius: "4px 0px 0px 4px",
          }}
        />
        {/*send button*/}
        <button
          onClick={sendMessage}
          style={{
            padding: "10px 20px",
            marginLeft: 0,
            height: 62,
            backgroundColor: darkMode ? '#444' : '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius:"0px 10px 10px 0",
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </div>
    </div>
    </div>
  );
}
