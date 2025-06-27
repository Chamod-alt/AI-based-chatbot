/*
import React, { useEffect, useState, useRef } from 'react';
import { db, ref, onChildAdded, get } from 'firebase/database';
import { useAuth } from '../context/AuthProvider'; // get login user details
import ChatMessage from './ChatMessage'; // Message UI

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  // auto Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!user) return; // cheack user is login or not

    // fetch history recent 50 message
    const fetchHistory = async () => {
      const messagesRef = ref(db, `chat/${user.uid}`);
      const snapshot = await get(messagesRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const history = Object.entries(data)
          .map(([id, msg]) => ({ id, ...msg }))
          .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)) // order messages as timestamp
          .slice(-50); //get only last 50 messeges
        setMessages(history);
      }
    };

    fetchHistory();

    // Real-time listener for new messages
    const userChatRef = ref(db, `chat/${user.uid}`);
    onChildAdded(userChatRef, (snapshot) => {
      const newMessage = { id: snapshot.key, ...snapshot.val() };
      setMessages(prev => [...prev, newMessage]);
    });
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]); //call scroll bottom

  return (
    <div style={{ height: '70vh', overflowY: 'auto', padding: 10 }}>
     
      {messages.map(msg => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
     
      <div ref={messagesEndRef} />
    </div>
  );
}
*/
