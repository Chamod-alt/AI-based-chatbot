
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';

export default function Signup() {
  const { register } = useAuth();// create variable using useAuth
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
 
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    //requre all inputs
    if (!email || !password || !confirm) {
      return setError('All fields are required.');
    }
  //check paswords
    if (password !== confirm) {
      return setError('Passwords do not match.');//show error message 
    }

    try {
      await register(email, password);
      navigate('/ChatWindow');// go to ChatWindow
    } catch (err) {
      console.error(err);
      setError('Signup failed. Try again.');//show error message 
    }
  };

  return (
    <div
      style={{
      
        color : '#000000',
        maxHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
        marginTop: 50,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 400,
         
          borderRadius: 10,
          padding: 45,
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
  
        <h2 style={{ marginBottom: 20 }}>Create Account</h2>

        <form onSubmit={handleSignup}>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}// set to value of Email
            style={{
              width: '100%',
              padding: 12,
              marginBottom: 15,
              borderRadius: 6,
              border: '1px solid #ccc',
            
              color:  '#000',
            }}
          />

          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}// set to value of password
            style={{
              width: '100%',
              padding: 12,
              marginBottom: 15,
              borderRadius: 6,
              border: '1px solid #ccc',
              
              color:  '#000',
            }}
          />

          <input
            type="password"
            value={confirm}
            placeholder="Confirm Password"
            onChange={(e) => setConfirm(e.target.value)}// set to value of password
            style={{
              width: '100%',
              padding: 12,
              marginBottom: 15,
              borderRadius: 6,
              border: '1px solid #ccc',
            
              backgroundColor: '#fff',
              
              color:  '#000',
            }}
          />

          {error && <p style={{ color: 'red', marginBottom: 15 }}>{error}</p>}
         {/*submit mutton*/}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: 12,
              
              backgroundColor: '#1976d2',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            Sign Up
          </button>
          <br />
          <br />
          {/*loggin link */}
          <p> if You lredy Signup <Link to="/">Please Login</Link></p>
        </form>
      </div>
    </div>
  );
}
