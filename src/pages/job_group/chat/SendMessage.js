import * as React from 'react'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { stringAvatar } from '../../../utils/Avatar.util';

import './message.css'

const SendMessage = (props) => {
  return (
    <Box className="msg-box">
      <Stack
        className="msg-stack"
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={1}>
        <div className="date-note" > {new Date().toLocaleString('vi-vn', {year:'numeric', month:'short', day: 'numeric', hour:'numeric', minute:'numeric'})}</div>
        <div className="send-msg">Send message</div>
        <Avatar  {...stringAvatar("Ki Tr")} />
      </Stack>
    </Box>
  )
}

export default SendMessage