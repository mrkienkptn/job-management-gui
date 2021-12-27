import  * as React from 'react'
import {
  Chip
} from '@mui/material'
import { stringToColor } from '../../../utils/Avatar.util'
const Tag = props => {
  const { label, deleteTag, clickTag } = props
  const handleClick = () => {
    clickTag()
  }
  const handleDelete = () => {
    deleteTag()
  }
  return (
    <Chip
      size='small'
      label = { label ? label : '' }
      onClick = { handleClick }
      onDelete = { handleDelete }
      style = {{
        backgroundColor: stringToColor(label),
        color: 'white'
      }}
    />
  )
}

export default Tag
