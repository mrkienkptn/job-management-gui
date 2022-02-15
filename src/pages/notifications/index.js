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

import Notification from './Notification'

import { getONotification } from '../../apis/notification'

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
  const [notifications, setNotifications] = React.useState([])
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getMyNotification = async () => {
    try {
      const res = await getONotification()
      if (res.status === 200) {
        setNotifications(res.data.data.data)
        
      }
    } catch(error) {

    }
  }
  React.useImperativeHandle(ref, () => ({
    openModal() {
      handleOpen()
    }
  }))
  React.useEffect(() => {
    getMyNotification()
  },[])
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
          {
            notifications && notifications.length > 0 && notifications.map((data, index) =>
              <Notification data={data} key={index} />
            )            
          }
        </Box>
      </Modal>
  )
}

export default React.forwardRef(Notifications)