import * as React from 'react';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import {
  TextField,
  IconButton,
  TextareaAutosize
} from '@mui/material';
import { te } from './MessageArea'
import SocketContext from '../../../socket/Context'
import { addMessage } from '../../../apis/conversation'

const InputArea = props => {
  const { socket } = React.useContext(SocketContext)
  const { group: { groupId, conversation, userId, userName }, msgs, setMsgs } = props
  const [text, setText] = React.useState('')
  const onSend = async () => {
    const payload = {
      senderId: userId,
      content: text
    }
    const payloadSocket = {
      senderId: {
        name: userName,
        _id: userId
      },
      content: text,
      createdAt: new Date().toString()
    }
    global.te = [payloadSocket, ...msgs]
    setMsgs(global.te)
    socket.emit('send-msg', { group: groupId, payload: payloadSocket })
    try {
      const res = await addMessage(groupId, conversation, payload)
      if (res.status === 200) {
        console.log(res.data.data)
      }
    } catch (error) {

    }
  }
  return (
    <Box className="input-area">
      <div className="message">
        {/* <TextField value={text} onChange={t=>setText(t.target.value)} multiline className="text" /> */}
        <textarea
          value={text}
          onChange={t=>setText(t.target.value)}
          style={{
            width: '100%',
            height: '100%'
          }}
        >
        </textarea>
      </div>
      <div className="send">
        <IconButton onClick={onSend}>
          <SendIcon />
        </IconButton>
      </div>
    </Box>

  )
}

export default InputArea