/*
// src/pages/ChatPage.js
import React, { useState, useEffect } from 'react';
import { db, ref, push, onValue, remove, update } from '../firebase/firebaseConfig';
import ChatMessage from '../components/ChatMessage';
import { GoogleGenerativeAI } from "@google/generative-ai";

const persona = {
  role: 'Psychology Counselor',
  tone: 'Empathetic and calm',
  prompt: "You are a professional psychology counselor. Always respond with empathy, patience, and helpful advice."
};

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [searchDate, setSearchDate] = useState('');

  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

  useEffect(() => {
    const messagesRef = ref(db, 'chat');
    onValue(messagesRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data).map(([id, msg]) => ({ id, ...msg }));
        setMessages(list);
      }
    });
  }, []);

const handleSend = async () => {
  if (!input.trim()) return;

  const messagesRef = ref(db, 'chat');

  // 1. Push the user's message
  const userMessage = {
    role: 'user',
    text: input,
    timestamp: new Date().toISOString()
  };
  await push(messagesRef, userMessage);

  // 2. Show a temporary Gemini "pending" message
  const pendingMessage = {
    role: 'assistant',
    text: '...',
    timestamp: new Date().toISOString()
  };
  const pendingRef = await push(messagesRef, pendingMessage); // we'll update this later

  // 3. Build chat history
  const chatHistory = [...messages, userMessage]
    .filter(m => m.role && m.text)
    .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
    .join('\n');

  try {
    const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });
    const result = await model.generateContent(`${persona.prompt}\n${chatHistory}\nAssistant:`);
    const reply = await result.response.text();

    // 4. Replace the "..." message with Gemini reply
    const aiMessage = {
      role: 'assistant',
      text: reply,
      timestamp: new Date().toISOString()
    };
    await update(ref(db, `chat/${pendingRef.key}`), aiMessage);

  } catch (err) {
    console.error("Gemini API error:", err);
    alert("Gemini API Error! See console.");
  }

  setInput('');
};

  const handleDelete = (id) => {
    const msgRef = ref(db, `chat/${id}`);
    remove(msgRef);
  };

  const handleUpdate = (id, currentText) => {
    const newText = prompt("Edit your message:", currentText);
    if (newText && newText.trim()) {
      const msgRef = ref(db, `chat/${id}`);
      update(msgRef, { text: newText });
    }
  };

  const formatDate = (isoDate) =>
    new Date(isoDate).toLocaleDateString('en-CA');

  const filteredMessages = searchDate
    ? messages.filter(msg => formatDate(msg.timestamp) === searchDate)
    : messages;

  const groupedMessages = filteredMessages.reduce((acc, msg) => {
    const date = formatDate(msg.timestamp || new Date());
    if (!acc[date]) acc[date] = [];
    acc[date].push(msg);
    return acc;
  }, {});

  return (
    <div style={{ padding: 20 }}>
      <h2>{persona.role} Chatbot</h2>

      
      <div style={{ marginBottom: 15 }}>
        <label> Filter by Date: </label>
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          style={{ padding: 5, marginLeft: 10 }}
        />
      </div>

      
      <div
        style={{
          height: '60vh',
          overflowY: 'scroll',
          border: '1px solid #ccc',
          padding: 10,
          marginBottom: 10,
          background: "#f9f9f9",
        }}
      >
        {Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date}>
            <h4 style={{ textAlign: 'center', color: '#888' }}>{date}</h4>
            {msgs.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                onDelete={() => handleDelete(msg.id)}
                onUpdate={() => handleUpdate(msg.id, msg.text)}
              />
            ))}
          </div>
        ))}
      </div>

      
      <div>
        <input
          type="text"
          value={input}
          placeholder="Type your message"
          onChange={e => setInput(e.target.value)}
          style={{ width: '70%', padding: 10 }}
        />
        <button onClick={handleSend} style={{ padding: 10, marginLeft: 10 }}>Send</button>
      </div>
    </div>
  );
}
*/

import React, { useState, useEffect, useRef } from 'react';
import { db, ref, push, onValue, remove, update } from '../firebase/firebaseConfig';
import ChatMessage from '../components/ChatMessage';
import { GoogleGenerativeAI } from "@google/generative-ai";

const persona = {
  role: 'Psychology Counselor',
  tone: 'Empathetic and calm',
  prompt: "You are a professional psychology counselor. Always respond with empathy, patience, and helpful advice."
};

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const messagesEndRef = useRef(null);
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Load chat from Firebase
  useEffect(() => {
    const messagesRef = ref(db, 'chat');
    onValue(messagesRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data).map(([id, msg]) => ({ id, ...msg }));
        setMessages(list);
      }
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const messagesRef = ref(db, 'chat');

    // 1. User message
    const userMessage = {
      role: 'user',
      text: input,
      timestamp: new Date().toISOString()
    };
    await push(messagesRef, userMessage);

    // 2. Temporary "typing" Gemini message
    const pendingMessage = {
      role: 'assistant',
      text: '...',
      timestamp: new Date().toISOString()
    };
    const pendingRef = await push(messagesRef, pendingMessage);

    // 3. Chat history
    const chatHistory = [...messages, userMessage]
      .filter(m => m.role && m.text)
      .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
      .join('\n');

    try {
      const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });
      const result = await model.generateContent(`${persona.prompt}\n${chatHistory}\nAssistant:`);
      const reply = await result.response.text();

      // 4. Replace pending Gemini message
      const aiMessage = {
        role: 'assistant',
        text: reply,
        timestamp: new Date().toISOString()
      };
      await update(ref(db, `chat/${pendingRef.key}`), aiMessage);

    } catch (err) {
      console.error("Gemini API error:", err);
      alert("Gemini API Error! See console.");
    }

    setInput('');
  };

  const handleDelete = (id) => {
    const msgRef = ref(db, `chat/${id}`);
    remove(msgRef);
  };

  const handleUpdate = (id, currentText) => {
    const newText = prompt("Edit your message:", currentText);
    if (newText && newText.trim()) {
      const msgRef = ref(db, `chat/${id}`);
      update(msgRef, { text: newText });
    }
  };

  const formatDate = (isoDate) =>
    new Date(isoDate).toLocaleDateString('en-CA');

  const filteredMessages = searchDate
    ? messages.filter(msg => formatDate(msg.timestamp) === searchDate)
    : messages;

  const groupedMessages = filteredMessages.reduce((acc, msg) => {
    const date = formatDate(msg.timestamp || new Date());
    if (!acc[date]) acc[date] = [];
    acc[date].push(msg);
    return acc;
  }, {});

  return (
    <div style={{ padding: 20 }}>
      <h2>{persona.role} Chatbot</h2>

      {/* Filter by date */}
      <div style={{ marginBottom: 15 }}>
        <label> Filter by Date: </label>
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          style={{ padding: 5, marginLeft: 10 }}
        />
      </div>

      {/* Chat display */}
      <div
        style={{
          height: '60vh',
          overflowY: 'scroll',
          border: '1px solid #ccc',
          padding: 10,
          marginBottom: 10,
          background: "#f9f9f9"
        }}
      >
        {Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date}>
            <h4 style={{ textAlign: 'center', color: '#888' }}>{date}</h4>
            {msgs.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                onDelete={() => handleDelete(msg.id)}
                onUpdate={() => handleUpdate(msg.id, msg.text)}
              />
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input and send */}
      <div>
        <input
          type="text"
          value={input}
          placeholder="Type your message"
          onChange={e => setInput(e.target.value)}
          style={{ width: '70%', padding: 10 }}
        />
        <button onClick={handleSend} style={{ padding: 10, marginLeft: 10 }}>Send</button>
      </div>
    </div>
  );
}
