
"use client";

import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import ChatIcon from '@mui/icons-material/Chat';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import ReactMarkdown from 'react-markdown';

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleSendMessage = async () => {
    if (input.trim() !== '') {
      setMessages([...messages, `User: ${input}`]);
      setInput('');
      try {
        const response = await fetch('/api/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input }),
        });

        if (response.ok) {
          const data = await response.json();
          setMessages((prevMessages) => [...prevMessages, `Assistant: ${data.response}`]);
        } else {
          setMessages((prevMessages) => [...prevMessages, 'Error: Could not get response.']);
        }
      } catch (error) {
        console.error('Error:', error);
        setMessages((prevMessages) => [...prevMessages, 'Error: Could not get response.']);
      }
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Paper elevation={4} sx={{ width: 300, maxHeight: 400, display: 'flex', flexDirection: 'column', backgroundColor: '#f0f0f0' }}>
          <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc' }}>
            <strong style={{ fontSize: '18px', color: '#333' }}>Travel Assistant</strong>
            <IconButton onClick={handleToggle} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ p: 1, flexGrow: 1, overflowY: 'auto', padding: '10px' }}>
            {messages.map((message, index) => (
              <div key={index} style={{
                marginBottom: '8px',
                wordBreak: 'break-word',
                fontSize: '14px',
                fontFamily: 'Arial, sans-serif',
                padding: '5px',
                borderRadius: '5px',
                backgroundColor: index % 2 === 0 ? '#fff' : '#ddd'
              }}>{message.includes('Assistant:') ? (
                <ReactMarkdown children={message.replace('Assistant: ', '')} />
              ) : (
                message
              )}</div>
            ))}
          </Box>
          <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Ask about travel plans or destinations..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={(e) => { if (e.key === 'Enter') { handleSendMessage(); } }}
              autoComplete="off"
              sx={{ borderRadius: '5px', padding: '5px' }}
            />
            <IconButton onClick={handleSendMessage} aria-label="send" size="large" sx={{ marginLeft: '5px' }}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Slide>
      <Fab color="primary" aria-label="chat" onClick={handleToggle}>
        <ChatIcon />
      </Fab>
    </Box>
  );
};

export default Chatbot;
