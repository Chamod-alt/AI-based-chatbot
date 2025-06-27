import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();// check user logging
  return user ? children : <Navigate to="/login" />;// if loging go to chat if not goto loggin
}
