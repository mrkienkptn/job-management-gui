import * as React from 'react'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { stringAvatar } from '../../../utils/Avatar.util';

import './message.css'

const SendMessage = (props) => {
  const { data } = props
  return (
    <Box className="msg-box">
      <Stack
        className="msg-stack"
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={1}>
        <div className="date-note" >
        {
            new Date().toLocaleDateString() === new Date(data.createdAt).toLocaleDateString()
            ? new Date(data.createdAt).toLocaleTimeString()
            : new Date(data.createdAt).toLocaleString()
          }
        </div>
        <div className="send-msg">{ data.content }</div>
        {/* <Avatar  {...stringAvatar(data.senderId.name)} /> */}
      </Stack>
    </Box>
  )
}

export default SendMessage