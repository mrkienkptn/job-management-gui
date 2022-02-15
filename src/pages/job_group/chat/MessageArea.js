import * as React from 'react'
import Box from '@mui/material/Box'
import SendMessage from './SendMessage'
import OtherMessage from './OtherMessage'

import SocketContext from '../../../socket/Context'

import { getConversation } from '../../../apis/conversation'
global.te = []
const MessageArea = props => {
  const { group: { groupId, conversation, userId }, msgs, setMsgs } = props
  const [pos, setPos] = React.useState({ s: 0, e: 10 })
  const { socket } = React.useContext(SocketContext)

  const getMessage = async () => {
    try {
      const res = await getConversation(groupId, conversation)
      if (res.status === 200) {
        setMsgs(res.data.data.messages)
        global.te = res.data.data.messages
      }
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    getMessage()
    socket.on('receive-msg', data => {
      global.te = [data, ...global.te]
      setMsgs(global.te)      
    })
    return () => {
      socket.off('receive-msg')
    }
  }, [])

  return (
    <Box className="message-area">
      {
        msgs && msgs.length > 0 && msgs.slice().reverse().map((msg, index) => (
          msg.senderId._id === userId
          ? <SendMessage key={ index } data={ msg }/>
          : <OtherMessage key={ index } data={ msg }/>
        ))
      }
    </Box>
  )
}

export default MessageArea
