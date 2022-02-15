import * as React from 'react'
import {
  Box,
  Avatar,
  Stack,
  Typography,
  IconButton,
  Tooltip
} from '@mui/material'
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { stringAvatar } from '../../../../utils/Avatar.util'

const Member = props => {
  const { data: { _id, name, email }, onAddFollower } = props
  const handleClickAdd = () => {
    onAddFollower({ _id, name, email })
  }
  return (
    <Stack 
      style={{
        backgroundColor: 'rgb(234 236 240)',
        borderRadius: 15,
        padding: 2,
        // color: 'rgb(25 118 210)'
      }}
      direction="row" spacing={1} alignItems="center" justifyContent="space-between">
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar style={{ fontSize: 16, width: 30, height: 30 }} {...stringAvatar(name)} />
        <Typography>
          {name}
        </Typography>
      </Stack>

      <IconButton onClick={handleClickAdd} style={{ width: 25, height: 25 }} >
        <AddCircleIcon />
      </IconButton>
    </Stack>
  )
}

export default Member