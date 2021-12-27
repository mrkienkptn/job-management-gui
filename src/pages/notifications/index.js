import *  as React from 'react'
import {
  Box,
  Stack,
  Avatar,
  IconButton,
  Tooltip,
  Modal,
  Typography,
  TextField,
  Button
} from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 500,
  overflowY: 'scroll',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

const Notifications = (props, ref) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useImperativeHandle(ref, () => ({
    openModal() {
      handleOpen()
    }
  }))
  return (
    
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography style={{marginBottom: 15}} textAlign={"center"} id="modal-modal-title" variant="h6" component="h2">
            Notifications
          </Typography>
          
        </Box>
      </Modal>
  )
}

export default React.forwardRef(Notifications)