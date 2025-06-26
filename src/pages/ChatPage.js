
// History of full code 

/*
import React, { useState, useEffect, useRef } from 'react';
import { db, ref, push, onValue, remove, update } from '../firebase/firebaseConfig';
import ChatMessage from '../components/ChatMessage';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useAuth } from '../context/AuthProvider';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

const persona = {
  role: 'Psychology Counselor',
  tone: 'Empathetic and calm',
  prompt: "You are a professional psychology counselor. Always respond with empathy, patience, and helpful advice."
};

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

  const handleSend = async () => {
    if (!input.trim() || !user) return;

    const userMessagesRef = ref(db, 'chat/' + user.uid);

    const userMessage = {
      role: 'user',
      text: input,
      timestamp: new Date().toISOString()
    };
    await push(userMessagesRef, userMessage);

    const pendingMessage = {
      role: 'assistant',
      text: '...',
      timestamp: new Date().toISOString()
    };
    const pendingRef = await push(userMessagesRef, pendingMessage);

    const chatHistory = [...messages, userMessage]
      .filter(m => m.role && m.text)
      .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
      .join('\n');

    try {
      const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });
      const result = await model.generateContent(`${persona.prompt}\n${chatHistory}\nAssistant:`);
      const reply = await result.response.text();

      const aiMessage = {
        role: 'assistant',
        text: reply,
        timestamp: new Date().toISOString()
      };
      await update(ref(db, `chat/${user.uid}/${pendingRef.key}`), aiMessage);
    } catch (err) {
      console.error("Gemini API error:", err);
      alert("Gemini API Error! See console.");
    }

    setInput('');
  };

  const handleDelete = (id) => {
    const msgRef = ref(db, `chat/${user.uid}/${id}`);
    remove(msgRef);
  };

  const handleUpdate = (id, currentText) => {
    const newText = prompt("Edit your message:", currentText);
    if (newText && newText.trim()) {
      const msgRef = ref(db, `chat/${user.uid}/${id}`);
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
    <div style={{ padding: "0px 20px", ...themeStyles, minHeight: '100vh' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>{persona.role} Chatbot</h2>
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
          height: '65vh',
          overflowY: 'scroll',
          padding: 10,
          marginBottom: 10,
          ...boxStyles
        }}
      >
        {Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date}>
            <h4 style={{ textAlign: 'center', color: darkMode ? '#bbb' : '#888' }}>{date}</h4>
            {msgs.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                onDelete={() => handleDelete(msg.id)}
                onUpdate={() => handleUpdate(msg.id, msg.text)}
                darkMode={darkMode}
              />
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
        <textarea
          value={input}
          placeholder="Type your message"
          onChange={e => setInput(e.target.value)}
          style={{
            width: '70%',
            padding: 10,
            height: 40,
            resize: 'vertical',
            overflowY: 'auto',
            backgroundColor: darkMode ? '#333' : '#fff',
            color: darkMode ? '#fff' : '#000',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={handleSend}
          style={{
            padding: 10,
            marginLeft: 15,
            height: 42,
            backgroundColor: darkMode ? '#444' : '#1976d2',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            borderRadius: 4
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
*/




/*
import React, { useState, useEffect, useRef } from 'react';
import {
  db,
  ref,
  push,
  onValue,
  remove,
  update,
  onChildAdded,
  query,
} from '../firebase/firebaseConfig';
import { useAuth } from '../context/AuthProvider';
import ChatMessage from '../components/ChatMessage';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

const persona = {
  role: 'Psychology Counselor',
  tone: 'Empathetic and calm',
  prompt:
    'You are a professional psychology counselor. Always respond with empathy, patience, and helpful advice.',
};

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

  // ✅ Fetch latest 50 messages from Firebase
  const fetchHistory = async () => {
    if (!user) return;

    const chatRef = ref(db, `chat/${user.uid}`);
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data)
          .map(([id, msg]) => ({ id, ...msg }))
          .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
          .slice(-50); // Get latest 50
        setMessages(list);
      } else {
        setMessages([]);
      }
    });
  };

  // ✅ Realtime Listener
  useEffect(() => {
    if (!user) return;
    fetchHistory();

    const chatRef = query(ref(db, `chat/${user.uid}`));
    const unsub = onChildAdded(chatRef, (snapshot) => {
      const newMsg = { id: snapshot.key, ...snapshot.val() };

      setMessages((prev) => {
        if (prev.some((msg) => msg.id === newMsg.id)) return prev;
        return [...prev, newMsg];
      });
    });

    return () => unsub(); // cleanup
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !user) return;

    const userRef = ref(db, `chat/${user.uid}`);

    const userMsg = {
      role: 'user',
      text: input,
      timestamp: new Date().toISOString(),
    };
    await push(userRef, userMsg);

    const pendingMsg = {
      role: 'assistant',
      text: '...',
      timestamp: new Date().toISOString(),
    };
    const pendingRef = await push(userRef, pendingMsg);

    const chatHistory = [...messages, userMsg]
      .filter((m) => m.role && m.text)
      .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
      .join('\n');

    try {
      const model = genAI.getGenerativeModel({
        model: 'models/gemini-2.0-flash',
      });
      const result = await model.generateContent(
        `${persona.prompt}\n${chatHistory}\nAssistant:`
      );
      const reply = await result.response.text();

      const aiMsg = {
        role: 'assistant',
        text: reply,
        timestamp: new Date().toISOString(),
      };

      await update(ref(db, `chat/${user.uid}/${pendingRef.key}`), aiMsg);
    } catch (err) {
      console.error('Gemini API error:', err);
      alert('Gemini API error. Check console.');
    }

    setInput('');
  };

  const handleDelete = (id) => {
    remove(ref(db, `chat/${user.uid}/${id}`));
  };

  const handleUpdate = (id, currentText) => {
    const newText = prompt('Edit your message:', currentText);
    if (newText && newText.trim()) {
      update(ref(db, `chat/${user.uid}/${id}`), { text: newText });
    }
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-CA');

  const filteredMessages = searchDate
    ? messages.filter((msg) => formatDate(msg.timestamp) === searchDate)
    : messages;

  const groupedMessages = filteredMessages.reduce((acc, msg) => {
    const date = formatDate(msg.timestamp || new Date());
    if (!acc[date]) acc[date] = [];
    acc[date].push(msg);
    return acc;
  }, {});

  const themeStyles = {
    background: darkMode ? '#121212' : '#fff',
    color: darkMode ? '#fff' : '#000',
  };

  const boxStyles = {
    backgroundColor: darkMode ? '#1f1f1f' : '#f9f9f9',
    border: '1px solid #ccc',
  };

  return (
    <div style={{ padding: '0 20px', ...themeStyles, minHeight: '100vh' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>{persona.role} Chatbot</h2>
        <button
          onClick={() => setDarkMode(!darkMode)}
          title="Toggle Theme"
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: 24,
            cursor: 'pointer',
            color: darkMode ? '#fff' : '#000',
          }}
        >
          {darkMode ? <MdLightMode size={24}  color="white" /> : <MdDarkMode size={24} />}
        </button>
      </div>

     
      <div style={{ marginBottom: 15 }}>
        <label>Filter by Date:</label>
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          style={{ padding: 5, marginLeft: 10 }}
        />
      </div>

      
      <div
        style={{
          height: '65vh',
          overflowY: 'scroll',
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
          ...boxStyles,
        }}
      >
        {Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date}>
            <h4 style={{ textAlign: 'center', color: darkMode ? '#aaa' : '#666' }}>
              {date}
            </h4>
            {msgs.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                onDelete={() => handleDelete(msg.id)}
                onUpdate={() => handleUpdate(msg.id, msg.text)}
                darkMode={darkMode}
              />
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

    
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            width: '70%',
            padding: 10,
            height: 40,
            resize: 'vertical',
            backgroundColor: darkMode ? '#333' : '#fff',
            color: darkMode ? '#fff' : '#000',
            border: '1px solid #ccc',
          }}
        />
        <button
          onClick={handleSend}
          style={{
            marginLeft: 10,
            padding: 10,
            height: 42,
            backgroundColor: darkMode ? '#555' : '#1976d2',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            borderRadius: 4,
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
*/