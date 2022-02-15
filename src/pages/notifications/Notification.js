import * as React from 'react'
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

import ACTION from '../../config/Notification.action'

const Notification = props => {
  const { _id, subject, object, v, group: { _id: groupId, name: groupName } } = props.data
  return (
    <Box>
      <Typography>
        {`${subject.name}${ACTION[v]}${groupName}`}
      </Typography>
    </Box>
  )
}

export default Notification
