import * as React from 'react'
import AddIcon from '@mui/icons-material/Add'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import {
  Box,
  Button,
  Card,
  CardActions,
  TextField,
  Popover,
  CardContent,
  Typography,
  IconButton,
  Stack
} from '@mui/material'
import SnackBar from '../../../utils/SnackBar'
import './index.css'
import { createTask } from '../../../apis/task'
import { editProcess } from '../../../apis/process'

const ColumnHeader = (props) => {
  const { title } = props.column
  const { column, addNewCard, groupId, setGroupData, deleteColumn } = props
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchorElMore, setAnchorElMore] = React.useState(null)
  const [cardTitle, setCardTitle] = React.useState('')
  const [cardDesc, setCardDesc] = React.useState('')
  const [isFinish, setIsFinish] = React.useState(column.isFinish)
  const snackBarRef = React.useRef()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onOpenMore = (event) => {
    setAnchorElMore(event.currentTarget)
  }

  const onCloseMore = () => {
    setAnchorElMore(null)
  }

  const onCancel = () => {
    handleClose()
    setCardTitle('')
    setCardDesc('')
  }

  const onAddCard = async () => {
    let card = {
      title: cardTitle,
      description: cardDesc
    }
    try {
      const res = await createTask(groupId, column.id, card)
      if (res.status === 200) {
        const { updatedGroup, createdTask } = res.data.data
        card.id = createdTask._id
        setGroupData(updatedGroup)
      } else {
        snackBarRef.current.openSnackBar()
      }
    } catch (error) {
      snackBarRef.current.openSnackBar()
    }
    addNewCard(column, card)
    onCancel()
  }
  const handleDeleteList = async () => {
    await deleteColumn(column)
  }
  const toggleDone = async () => {
    setIsFinish(!isFinish)
    onCloseMore()
    try {
      const payload = {
        isFinish: isFinish ? false: true
      }
      const res = await editProcess(groupId, column.id, payload)
      if (res.status === 200) {
        setGroupData(res.data.data.group)
      } else {
        setIsFinish(!isFinish)
        snackBarRef.current.openSnackBar()
      }
    } catch (error) {
      setIsFinish(!isFinish)
      snackBarRef.current.openSnackBar()
    }
  }
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const openMore = Boolean(anchorElMore)
  const idMore = openMore ? 'simple-popover' : undefined

  return (
    <Box style={{
      width: '100%',
      marginBottom: 20
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15
      }}>
        <Typography
          style={{
            flexGrow: 1,
            fontWeight: 'bold',
            color: isFinish ? 'green' : 'black'
          }}
        >
          {title}
        </Typography>
        <IconButton
          style={{ padding: 0 }}
          onClick={onOpenMore}
        >
          <MoreHorizIcon />
        </IconButton>
      </div>
      <Popover
        id={idMore}
        open={openMore}
        anchorEl={anchorElMore}
        onClose={onCloseMore}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        style={{
          width: 500,
          height: 300
        }}
      >
        <Typography
          style={{
            fontWeight: 'bold',
            color: 'black',
            padding: '15px 15px 0px 15px'
          }}
        >
          {title}
        </Typography>
        <Stack className="header-btn-more" direction="column" style={{ width: 250, padding: 15 }} spacing={1}>
          <Button
            onClick={toggleDone}
            className={`btn ${ isFinish ? 'normal' :'done' }`}
            startIcon={
              isFinish ? 
                <CancelOutlinedIcon size="small"/>
              :
                <CheckCircleOutlineIcon size="small" />
            }
          >
            {
              isFinish ? 'Mark As Normal Process' : 'Mark As Done Process'
            }
          </Button>
          <Button
            onClick={handleDeleteList}
            className="btn delete"
            startIcon={<DeleteIcon size="small" />}
          >
            Delete List
          </Button>
        </Stack>
      </Popover>
      <Button
        onClick={handleClick}
        startIcon={<AddIcon />}
        variant='outlined'
        size='small'
        style={{
          width: 'inherit',
          textTransform: 'none',

        }}
      >
        Add new card
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <TextField
              style={{ marginBottom: 10 }}
              label="Title"
              id="outlined-size-small"
              size="small"
              value={cardTitle}
              onChange={t => setCardTitle(t.target.value)}
            />

            <TextField
              label="Description"
              id="outlined-size-small"
              size="small"
              value={cardDesc}
              onChange={t => setCardDesc(t.target.value)}
            />
          </CardContent>
          <CardActions>
            <Button style={{ textTransform: 'none' }} onClick={onAddCard} size="small" variant="contained">Add Card</Button>
            <Button style={{ textTransform: 'none' }} onClick={onCancel} size="small" variant="outlined">Cancel</Button>
          </CardActions>
        </Card>

      </Popover>
      <SnackBar ref={snackBarRef} />
    </Box>
  )
}
export default ColumnHeader