import * as React from 'react'
import {
  Box,
  Avatar,
  Stack,
  Typography,
  IconButton,
  Tooltip
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { stringAvatar } from '../../../utils/Avatar.util'

const FoundUser = props => {
  const { data: { _id, name, email }, addMember } = props
  const onAddMember = () => {
    addMember({ _id, email, name })
  }
  return (
    <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar style={{ fontSize: 16, width: 30, height: 30 }} {...stringAvatar(name)} />
        <Typography>
          {name}
        </Typography>
      </Stack>
      <Tooltip title={`Add ${name} to group`}>
        <IconButton onClick={onAddMember} style={{ width: 25, height: 25 }} >
          <AddCircleOutlineIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  )
}

export default FoundUser