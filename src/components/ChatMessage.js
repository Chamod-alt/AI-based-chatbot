
import React, { useState, useEffect } from 'react';
import { MdEdit, MdDelete, MdSave, MdCancel } from 'react-icons/md';//import icons
import './ChatMessage.css';//import css file

export default function ChatMessage({ message, onDelete, onUpdate, darkMode, readOnly = false }) {
  const date = new Date(message.timestamp);
  //add date and time
  const formatted = date.toLocaleString('en-US', {
    dateStyle: 'short',
    timeStyle: 'short'
  });
//user and gimini messages
  const isUser = message.role === 'user';
  const isPending = message.text === '...' && !isUser;
//dark light color teams
  const backgroundColor = isUser
    ? darkMode ? '#2a3b3c' : '#e0f7fa'
    : darkMode ? '#3a4b3c' : '#c8e6c9';

  const textColor = darkMode ? '#fff' : '#000';

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(message.text);
// edit message set
  useEffect(() => {
    setEditedText(message.text);
  }, [message.text]);

  const handleSave = () => {
    if (editedText.trim()) {
      message.text = editedText;
      onUpdate?.(editedText); // Optional chaining
      setIsEditing(false);
    }
  };

  return (
    //devided two sides gimini and user
    <div style={{ textAlign: isUser ? 'left' : 'right', marginBottom: '15px' }}>
      <div
        style={{
          display: 'inline-block',
          padding: '10px',
          borderRadius: '8px',
          backgroundColor,
          color: textColor,
          maxWidth: '70%',
          position: 'relative',
          minWidth: '20%'
        }}
      >
        <strong>{isUser ? 'You' : 'Gemini'}:</strong>{/*Name of them */}

        {/* show dot line in pending time*/}
        {isPending ? (
          <div className="typing-indicator">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        ) : isEditing ? ( 
          <>
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              style={{
                width: '100%',
                marginTop: '8px',
                height: '80px',
                padding: '6px',
                resize: 'vertical',
                backgroundColor: darkMode ? '#222' : '#fff',
                color: darkMode ? '#fff' : '#000',
                border: '1px solid #999',
                borderRadius: '5px'
              }}
            />
            {!readOnly && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
                <button
                  onClick={handleSave}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '18px', marginRight: 6 }}
                  title="Save"
                >
                  <MdSave color={darkMode ? '#90caf9' : '#1976d2'} />
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '18px' }}
                  title="Cancel"
                >
                  <MdCancel color="orange" />
                </button>
              </div>
            )}
          </>
        ) : (
          <p style={{ margin: '5px 0', whiteSpace: 'pre-wrap' }}>{message.text}</p>
        )}

        {/* edd edit icon and delet icon*/} 
        {!isPending && !isEditing && !readOnly && (
          <div style={{ marginTop: 5, fontSize: 12 }}>
          
            <button
              onClick={() => setIsEditing(true)}
              style={{ marginRight: 5, background: 'transparent', border: 'none', fontSize: '17px', cursor: 'pointer' }}
              title="Edit"
            >
              <MdEdit color={darkMode ? '#90caf9' : '#1976d2'} />
            </button>
            <button
              onClick={onDelete}
              style={{ background: 'transparent', border: 'none', fontSize: '17px', cursor: 'pointer' }}
              title="Delete"
            >
              <MdDelete color="red" />
            </button>
          </div>
        )}

       {/*show dade and time evry message*/}
        <small style={{ fontSize: '0.75rem', color: darkMode ? '#aaa' : '#555' }}>{formatted}</small>
      </div>
    </div>
  );
}




