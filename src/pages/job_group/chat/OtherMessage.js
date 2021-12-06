import * as React from 'react'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { stringAvatar } from '../../../utils/Avatar.util';

import './message.css'

const OtherMessage = (props) => {
  return (
    <Box className="msg-box">
      <Stack 
        className="msg-stack" 
        direction="row" 
        justifyContent="flex-start" 
        alignItems="center"
        spacing={1}>
          <Avatar {...stringAvatar("Ki Tr")} />
        <div className="other-msg">receive message</div>
        <div className="date-note" > {new Date().toLocaleString('vi-vn', {year:'numeric', month:'short', day: 'numeric', hour:'numeric', minute:'numeric'})}</div>
      </Stack>
    </Box>
  )
}

export default OtherMessage