import * as React from 'react';
import Box from '@mui/material/Box';
import InputArea from './InputArea'
import MessageArea from './MessageArea';
import GroupContext from '../../../components/base_layout/GroupContext'
import './index.css'
const Chat = props => {
  const group = React.useContext(GroupContext)
  const [ msgs, setMsgs ] = React.useState([])
  return (
    <Box className="chat-container">
      <MessageArea
        group={group}
        msgs={msgs}
        setMsgs={setMsgs}
      />
      <InputArea
        group={group}
        msgs={msgs}
        setMsgs={setMsgs}
      />
    </Box>

  )
}

export default Chat