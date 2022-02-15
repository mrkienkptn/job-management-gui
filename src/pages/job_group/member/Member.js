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
import { stringAvatar } from '../../../utils/Avatar.util'

const Member = props => {
  const { data: { _id, name, email }, removeMember, adminId } = props
  const onRemoveMember = () => {
    removeMember({ _id, email, name })
  }
  return (
    <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar style={{ fontSize: 16, width: 30, height: 30 }} {...stringAvatar(name)} />
        <Typography>
          {name}
        </Typography>
      </Stack>
      {
        _id !== adminId 
        ?
          <Tooltip title={`Remove ${name} from group`}>
            <IconButton onClick={onRemoveMember} style={{ width: 25, height: 25 }} >
              <CancelSharpIcon />
            </IconButton>
          </Tooltip>
        :
          <label style={{fontSize: 'small', color: 'green'}} >Admin</label>
      }
    </Stack>
  )
}

export default Member