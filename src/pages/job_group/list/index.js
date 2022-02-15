import * as React from 'react'
import {
  Box,
  Avatar,
  Stack,
  Typography
} from '@mui/material'
import {
  DataGrid,
  GridToolbar,
  GridRowsProp,
  GridColDef
} from '@mui/x-data-grid'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import RemoveIcon from '@mui/icons-material/Remove'

import JobGroupContext from '../Context'

import { stringAvatar } from '../../../utils/Avatar.util'

const List = props => {
  const { groupData } = React.useContext(JobGroupContext)
  const cols = [
    { field: 'id', headerName: 'Task ID', hide: true },
    { field: 'name', headerName: 'Name' },
    { field: 'process', headerName: 'Process' },
    { field: 'description', headerName: 'Description' },
    {
      field: 'assignees',
      headerName: 'Assignees',
      width: 300,
      renderCell: (assignees) => (
        <Stack direction='row' spacing={1}>
          {assignees.value && assignees.value.length > 0 && assignees.value.map((assignee, index) => (
            <Avatar key={index} style={{ fontSize: 11, width: 20, height: 20 }} {...stringAvatar(assignee.name)} />
          ))}
        </Stack>
      )
    },
    {
      field: 'followers',
      headerName: 'Followers',
      width: 300,
      renderCell: (followers) => (
        <Stack direction='row' spacing={1}>
          {followers.value && followers.value.length > 0 && followers.value.map((follower, index) => (
            <Avatar key={index} style={{ fontSize: 11, width: 20, height: 20 }} {...stringAvatar(follower.name)} />
          ))}
        </Stack>
      )
    },
    {
      field: 'dueDate',
      headerName: 'Due date',
      width: 150,
      renderCell: (date) => {
        if (date.value === '') {
          return <Typography></Typography>
        }
        return <Typography
          style={{
            fontSize: 12,
            fontWeight: 'bold',
            color: new Date().getTime() > new Date(date.value).getTime() ? 'red' : 'green'
          }}
        >
          {date.value.toDateString()}
        </Typography>
      }
    },
    {
      field: 'finished',
      headerName: 'Finished',
      renderCell: (v) => (
        v.value
        ? <CheckCircleOutlinedIcon style={{color: 'green'}} />
        : <RemoveIcon />
      )
    }
  ]
  const [columns, setColumns] = React.useState(cols)
  const [rows, setRows] = React.useState([])

  const onRowClick = (params, event) => {
    console.log(params)
    console.log(event)
  }

  React.useEffect(() => {
    const rows = []
    groupData.processes.forEach(process => {
      process.tasks.forEach(task => {
        const dueDate = new Date(task.dueDate)
        const isValidDate = dueDate instanceof Date && !isNaN(dueDate)
        const r = {
          id: task._id,
          name: task.title,
          process: process.name,
          finished: process.isFinish,
          assignees: task.assignees,
          followers: task.followers,
          dueDate: isValidDate ? dueDate : '',
          description: task.description
        }
        rows.push(r)
      })
    })

    setRows(rows)
  }, [groupData])

  return (
    <Box style={{ height: 'calc(100vh - 113px)', width: '100%' }}>
      <DataGrid
        columns={columns}
        rows={rows}
        localeText={{
          toolbarDensity: 'Size',
          toolbarDensityLabel: 'Size',
          toolbarDensityCompact: 'Small',
          toolbarDensityStandard: 'Medium',
          toolbarDensityComfortable: 'Large',
        }}
        components={{
          Toolbar: GridToolbar
        }}
        onRowClick={onRowClick}
      />
    </Box>
  )
}

export default List