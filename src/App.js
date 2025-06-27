

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider } from './context/AuthProvider';
import ProtectedRoute from './pages/ProtectedRoute';
import Navbar from './components/Navbar';
import Chatwindow from './components/ChatWindow'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ChatPage" element={<ChatPage />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/ChatWindow" element={
            <ProtectedRoute>
             
             <Chatwindow />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}





