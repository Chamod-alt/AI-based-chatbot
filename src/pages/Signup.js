/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export default function Signup() {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !confirm) {
      return setError('All fields are required.');
    }

    if (password !== confirm) {
      return setError('Passwords do not match.');
    }

    try {
      await register(email, password);
      navigate('/ChatPage');
    } catch (err) {
      console.error(err);
      setError('Signup failed. Try again.');
    }
  };

  return (
    <form onSubmit={handleSignup} style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
      <h2>Sign Up</h2>

      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />

      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />

      <input
        type="password"
        value={confirm}
        placeholder="Confirm Password"
        onChange={e => setConfirm(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit" style={{ padding: 10, width: '100%' }}>
        Create Account
      </button>
    </form>
  );
}
*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';

export default function Signup() {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !confirm) {
      return setError('All fields are required.');
    }

    if (password !== confirm) {
      return setError('Passwords do not match.');
    }

    try {
      await register(email, password);
      navigate('/ChatPage');
    } catch (err) {
      console.error(err);
      setError('Signup failed. Try again.');
    }
  };

  return (
    <div
      style={{
        //backgroundColor: darkMode ? '#1e1e1e' : '#f5f5f5',
        //color: darkMode ? '#ffffff' : '#000000',
        color : '#000000',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 400,
          //backgroundColor: darkMode ? '#2c2c2c' : '#ffffff',
          borderRadius: 10,
          padding: 30,
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        {/* Toggle */}
        {/*
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            //backgroundColor: darkMode ? '#444' : '#ddd',
            color: darkMode ? '#fff' : '#000',
            border: 'none',
            borderRadius: 4,
            padding: '6px 12px',
            marginBottom: 20,
            cursor: 'pointer',
            float: 'right',
          }}
        >
          {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
        </button>
*/}
        <h2 style={{ marginBottom: 20 }}>Create Account</h2>

        <form onSubmit={handleSignup}>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: 12,
              marginBottom: 15,
              borderRadius: 6,
              border: '1px solid #ccc',
              //backgroundColor: darkMode ? '#333' : '#fff',
              //color: darkMode ? '#fff' : '#000',
              color:  '#000',
            }}
          />

          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: 12,
              marginBottom: 15,
              borderRadius: 6,
              border: '1px solid #ccc',
              //backgroundColor: darkMode ? '#333' : '#fff',
              //color: darkMode ? '#fff' : '#000',
              color:  '#000',
            }}
          />

          <input
            type="password"
            value={confirm}
            placeholder="Confirm Password"
            onChange={(e) => setConfirm(e.target.value)}
            style={{
              width: '100%',
              padding: 12,
              marginBottom: 15,
              borderRadius: 6,
              border: '1px solid #ccc',
              //backgroundColor: darkMode ? '#333' : '#fff',
              backgroundColor: '#fff',
              //color: darkMode ? '#fff' : '#000',
              color:  '#000',
            }}
          />

          {error && <p style={{ color: 'red', marginBottom: 15 }}>{error}</p>}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: 12,
              //backgroundColor: darkMode ? '#444' : '#1976d2',
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
          <p> if You lredy Signup <Link to="/">Please Login</Link></p>
        </form>
      </div>
    </div>
  );
}
