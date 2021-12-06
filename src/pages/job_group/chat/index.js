import * as React from 'react';
import Box from '@mui/material/Box';
import InputArea from './InputArea'
import MessageArea from './MessageArea';
import './index.css'
const Chat = props => {
  return (
    <Box className="chat-container">
      <MessageArea/>
      <InputArea/>
    </Box>

  )
}

export default Chat