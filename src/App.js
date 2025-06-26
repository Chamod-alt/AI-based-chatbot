import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider } from './context/AuthProvider';
import ProtectedRoute from './pages/ProtectedRoute';

import Chatwindow from './components/ChatWindow'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ChatPage" element={
            <ProtectedRoute>
             {/*<ChatPage /> */}
             <Chatwindow />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}




// src/App.js
{/*
import React from 'react';
import ChatPage from './pages/ChatPage';

function App() {
  return <ChatPage />;
}

export default App;
*/}