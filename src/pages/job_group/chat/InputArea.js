import * as React from 'react';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';

const InputArea = props => {
  return (
    <Box className="input-area">
      <div className="message">
        <input className="text" multiple aria-multiline/>
      </div>
      <div className="send">
        <SendIcon color="info" sx={{fontSize: 36}} />
      </div>
    </Box>

  )
}

export default InputArea