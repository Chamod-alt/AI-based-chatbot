/*import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import './ChatMessage.css';

export default function ChatMessage({ message, onDelete, onUpdate }) {
  const date = new Date(message.timestamp);
  const formatted = date.toLocaleString('en-US', {
    dateStyle: 'short',
    timeStyle: 'short'
  });

  const isUser = message.role === 'user';
  const isPending = message.text === '...'; // pending Gemini response

  return (
    <div
      style={{
        textAlign: isUser ? 'left' : 'right',
        marginBottom: '20px'
      }}
    >
      <div
        style={{
          display: 'inline-block',
          padding: '10px',
          borderRadius: '8px',
          backgroundColor: isUser ? '#e0f7fa' : '#c8e6c9',
          maxWidth: '70%',
          position: 'relative'
        }}
      >
        <strong>{isUser ? 'You' : 'Gemini'}:</strong>

        {isPending ? (
          <div style={{
            marginTop: 5,
            height: '10px',
            borderTop: '2px dotted #777',
            animation: 'blink 1s linear infinite',
            marginBottom: '10px'
          }} />
        ) : (
          <p style={{ margin: '5px 0' }}>{message.text}</p>
        )}

        <div style={{ marginTop: 5, fontSize: 12 }}>
          <button
            onClick={onUpdate}
            style={{
              marginLeft: 1,
              background: 'transparent',
              outline: 'none',
              border: 'none',
              fontSize: '17px',
              cursor: 'pointer'
            }}
          >
            <MdEdit color="#1976d2" />
          </button>
          <button
            onClick={onDelete}
            style={{
              color: 'red',
              background: 'transparent',
              outline: 'none',
              border: 'none',
              fontSize: '17px',
              cursor: 'pointer'
            }}
          >
            <MdDelete color="red" />
          </button>
        </div>

        <small style={{ fontSize: '0.75rem', color: '#555' }}>{formatted}</small>
      </div>
    </div>
  );
}
*/

import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import './ChatMessage.css'; // 👈 Create this CSS file

export default function ChatMessage({ message, onDelete, onUpdate }) {
  const date = new Date(message.timestamp);
  const formatted = date.toLocaleString('en-US', {
    dateStyle: 'short',
    timeStyle: 'short'
  });

  const isUser = message.role === 'user';
  const isPending = message.text === '...' && !isUser;

  return (
    <div
      style={{
        textAlign: isUser ? 'left' : 'right',
        marginBottom: '15px'
      }}
    >
      <div
        style={{
          display: 'inline-block',
          padding: '10px',
          borderRadius: '8px',
          backgroundColor: isUser ? '#e0f7fa' : '#c8e6c9',
          maxWidth: '70%',
          position: 'relative',
          minWidth: '20%'
        }}
      >
        <strong>{isUser ? 'You' : 'Gemini'}:</strong>
        {isPending ? (
          <div className="typing-indicator">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        ) : (
          <p style={{ margin: '5px 0' }}>{message.text}</p>
        )}

        {/* Edit/Delete buttons */}
        <div style={{ marginTop: 5, fontSize: 12 }}>
          <button
            onClick={onUpdate}
            style={{
              marginLeft: 1,
              background: 'transparent',
              outline: 'none',
              border: 'none',
              fontSize: '17px',
              cursor: 'pointer'
            }}
          >
            <MdEdit color="#1976d2" />
          </button>
          <button
            onClick={onDelete}
            style={{
              color: 'red',
              background: 'transparent',
              outline: 'none',
              border: 'none',
              fontSize: '17px',
              cursor: 'pointer'
            }}
          >
            <MdDelete color="red" />
          </button>
        </div>

        <small style={{ fontSize: '0.75rem', color: '#555' }}>{formatted}</small>
      </div>
    </div>
  );
}
