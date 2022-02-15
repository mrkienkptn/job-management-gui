import * as React from 'react'
import {
  Avatar,
  Stack,
  Typography,
  IconButton,
} from '@mui/material'
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import { stringAvatar } from '../../../../utils/Avatar.util'

const Member = props => {
  const { data: { _id, name, email }, onRemoveAssignee } = props
  const handleClickRemove = () => {
    onRemoveAssignee({  _id, name, email  })
  }
  return (
    <Stack 
      style={{
        backgroundColor: '#aeeb34',
        borderRadius: 15,
        padding: 2
      }}
      direction="row" spacing={1} alignItems="center" justifyContent="space-between">
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar style={{ fontSize: 16, width: 30, height: 30 }} {...stringAvatar(name)} />
        <Typography>
          {name}
        </Typography>
      </Stack>

      <IconButton onClick={handleClickRemove} style={{ width: 25, height: 25 }} >
        <CancelSharpIcon />
      </IconButton>
    </Stack>
  )
}

export default Member