import React, { useState, useEffect, useRef } from 'react';
import { db, ref,  onValue, } from '../firebase/firebaseConfig';//firebase databace aceess
import ChatMessage from '../components/ChatMessage';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useAuth } from '../context/AuthProvider';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

import Navbar from "../components/Navbar";
/*
const persona = {
  role: 'Psychology Counselor',
  tone: 'Empathetic and calm',
  prompt: "You are a professional psychology counselor. Always respond with empathy, patience, and helpful advice."
};
*/
export default function ChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const messagesEndRef = useRef(null);
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
  const { user } = useAuth();

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch message history (without infinite loop)
  useEffect(() => {
    if (!user) return;
    const userMessagesRef = ref(db, 'chat/' + user.uid);

    onValue(userMessagesRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data).map(([id, msg]) => ({ id, ...msg }));
        setMessages(list);
      } else {
        setMessages([]);
      }
    });
  }, [user?.uid]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

//iso date formate 
  const formatDate = (isoDate) =>
    new Date(isoDate).toLocaleDateString('en-CA');
// group messages using data and display under it
  const filteredMessages = searchDate
    ? messages.filter(msg => formatDate(msg.timestamp) === searchDate)
    : messages;

  const groupedMessages = filteredMessages.reduce((acc, msg) => {
    const date = formatDate(msg.timestamp || new Date());
    if (!acc[date]) acc[date] = [];
    acc[date].push(msg);
    return acc;
  }, {});

//thems style
  const themeStyles = {
    background: darkMode ? '#1e1e1e' : '#ffffff',
    color: darkMode ? '#ffffff' : '#000000'
  };

  const boxStyles = {
    backgroundColor: darkMode ? '#2c2c2c' : '#f9f9f9',
    border: '1px solid #ccc',
    borderRadius: '5px'
  };

  return (
    <div>
       <Navbar />
    <div style={{ padding: "0px 20px", ...themeStyles, maxHeight: '100vh' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop:"5px" }}>
        {/*<h2>{persona.role} Chatbot</h2>*/}
        <div style={{ marginBottom: 15 }}>
        <label> choice  Date: </label>
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          style={{ padding: 5, marginLeft: 10 }}
        />
      </div>


      {/* darl /light button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: 24,
            cursor: 'pointer'
          }}
          title="Toggle Theme"
        >
          {darkMode ? <MdLightMode size={24}  color="white" /> : <MdDarkMode size={24} />}
        </button>
      </div>

      
      
      <div
        style={{
          height: '72vh',
          overflowY: 'scroll',
          padding: 10,
          marginBottom: 10,
          ...boxStyles
        }}
      >
        {/* message display*/ }
        {Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date}>
            <h4 style={{ textAlign: 'center', color: darkMode ? '#bbb' : '#888' }}>{date}</h4>
            {msgs.map((msg) => (
              <ChatMessage
              key={msg.id}
              message={msg}
              darkMode={darkMode}
              readOnly={true}
            />
            
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

    </div>
    </div>
  );
}