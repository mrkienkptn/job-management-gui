import * as React from 'react'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { stringAvatar } from '../../../utils/Avatar.util';

import './message.css'

const OtherMessage = (props) => {
  const { data } = props
  return (
    <Box className="msg-box">
      <Stack 
        className="msg-stack" 
        direction="row" 
        justifyContent="flex-start" 
        alignItems="center"
        spacing={1}>
          <Avatar style={{fontSize: 14, width: 24, height: 24}} {...stringAvatar(data.senderId.name)} />
        <div className="other-msg">{ data.content }</div>
        {/* <div className="date-note" > {new Date().toLocaleString('vi-vn', {year:'numeric', month:'short', day: 'numeric', hour:'numeric', minute:'numeric'})}</div> */}
        <div className='date-note' >
          {
            new Date().toLocaleDateString() === new Date(data.createdAt).toLocaleDateString()
            ? new Date(data.createdAt).toLocaleTimeString()
            : new Date(data.createdAt).toLocaleString()
          }
        </div>
      </Stack>
    </Box>
  )
}

export default OtherMessage