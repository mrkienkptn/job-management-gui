import * as React from 'react';
import {
  Box,
  Modal,
  Button,
  Typography,
  CardActions,
  CardContent,
  Card,
  TextField,
  Stack,
  IconButton,
  Avatar
} from '@mui/material'
import {
  PersonOutline,
  PlaylistAddCheck,
  AccessTime,
  Person,
  Label,
  Add as AddIcon
} from '@mui/icons-material'
import {
  DatePicker,
  LocalizationProvider
} from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import JobGroupContext from '../Context'
import CheckList from './CheckList'
import Tag from './tag/Tag'
import SelectTags from './tag/SelectTags'
import SelectAssignee from './assignee/SelectAssignee'
import SelectFollower from './follower/SelectFollower'
import SnackBar from '../../../utils/SnackBar'
import './index.css'
import './textField.css'
import { stringAvatar } from '../../../utils/Avatar.util'
import { borderRadius } from '@mui/system';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height: 700,
  overflowY: 'scroll'
};

const CardModal = (props, ref) => {
  const { groupData, setGroupData } = React.useContext(JobGroupContext)
  const { id: taskId, title, description, taskDetail } = props.data
  const {
    onAddAssignee,
    onRemoveAssignee,
    onAddFollower,
    onRemoveFollower,
    onSaveChange
  } = props
  const [open, setOpen] = React.useState(false);
  const [dueDate, setDueDate] = React.useState(new Date(taskDetail.dueDate))
  const [tit, setTit] = React.useState(title)
  const [desc, setDesc] = React.useState(description)
  const [openDatePicker, setOpenDatePikcer] = React.useState(false)
  const selectTagsRef = React.useRef()
  const selectAssigneeRef = React.useRef()
  const selectFollowerRef = React.useRef()
  const snackBarRef = React.useRef()
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const openSnackBar = () => {
    snackBarRef.current.openSnackBar()
  }
  const [tags, setTags] = React.useState([{ id: 1, name: 'Copy re' }, { id: 2, name: 'Need Authen' }, { id: 3, name: 'tag3' }])
  const clickTag = (id) => {

  }
  const deleteTag = (id) => {
    // const updateTags = tags.reduce(())
  }
  const openSelectTags = (event) => {
    selectTagsRef.current.openSelectTags(event)
  }
  const openSelectAssignee = (event) => {
    selectAssigneeRef.current.openSelectAssignee(event)
  }
  const openSelectFollower = (event) => {
    selectFollowerRef.current.openSelectFollower(event)
  }

  const saveChange = () => {
    if (tit === '') {
      openSnackBar()
      return
    }
    if (desc === ''){
      openSnackBar()
      return
    }
    const isValidDate = dueDate instanceof Date && !isNaN(dueDate)
    const compareDate = isValidDate && (new Date(taskDetail.dueDate).getTime === dueDate.getTime())
    let data = {
      title: tit,
      description: desc
    }
    if (tit === title && desc === description ) {
      if (!isValidDate || compareDate) return
      else data = {
        dueDate
      }
    } else {
      data = {
        title: tit,
        description: desc
      }
      if (!compareDate) {
        data = {
          ...data,
          dueDate
        }
      }
    }
    
    onSaveChange(data)
  }
  React.useImperativeHandle(ref, () => ({
    openModal() {
      handleOpen()
    }
  }))
  React.useEffect(() => {
    if (open) {
      console.log(dueDate)
      console.log(taskDetail.dueDate)
    }
  })
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        style={{ overflowY: 'scroll', border: 'none' }}
      >
        <Box sx={style}>
          <Card style={{ width: '100%', height: '100%',  overflowY: 'scroll' }}>
            <CardContent>
              <div style={{}}>
                <input
                  value={tit}
                  onChange={t => setTit(t.target.value)}
                  className='card-title'
                  
                />
                <div style={{ margin: '15px 0px' }}>
                  <span>Project: </span>
                  <span style={{ fontWeight: 'bold' }}>Project Name</span>
                </div>
                <div>

                  <Stack direction="row" spacing={1} style={{ marginBottom: 15 }}>
                    <p style={{ margin: 0 }}>Labels: </p>
                    {
                      tags && tags.length > 0 && tags.map((tag) => (
                        <Tag
                          label={tag.name}
                          key={tag.id}
                          clickTag={clickTag}
                          deleteTag={deleteTag}
                        />
                      ))
                    }
                    <IconButton
                      size='small'
                      style={{ backgroundColor: '#eaecf0' }}
                      onClick={openSelectTags}
                    >
                      <AddIcon fontSize="inherit" />
                    </IconButton>
                  </Stack>
                  <SelectTags tags={tags} ref={selectTagsRef} />
                </div>
                <div>
                  <Stack direction="row" spacing={1} style={{ marginBottom: 15 }} alignItems={"center"}>
                    <p style={{ margin: 0 }}>Assignees: </p>
                    {
                      taskDetail.assignees && taskDetail.assignees.length > 0 && taskDetail.assignees.map((a, i) => (
                        <Avatar key={i} style={{ fontSize: 16, width: 30, height: 30 }} {...stringAvatar(a.name)} />
                      ))
                    }
                  </Stack>
                  <Stack direction="row" spacing={1} style={{ marginBottom: 15 }} alignItems={"center"}>
                    <p style={{ margin: 0 }}>Followers: </p>
                    {
                      taskDetail.followers && taskDetail.followers.length > 0 && taskDetail.followers.map((a, i) => (
                        <Avatar key={i} style={{ fontSize: 16, width: 30, height: 30 }} {...stringAvatar(a.name)} />
                      ))
                    }
                  </Stack>
                  {
                    taskDetail.assignees && <SelectAssignee
                      data={{
                        members: groupData.members,
                        assignees: taskDetail.assignees || []
                      }}
                      ref={selectAssigneeRef}
                      onAddAssignee={onAddAssignee}
                      onRemoveAssignee={onRemoveAssignee}
                    />
                  }
                  {
                    taskDetail.followers && <SelectFollower
                      data={{
                        members: groupData.members,
                        followers: taskDetail.followers || []
                      }}
                      ref={selectFollowerRef}
                      onAddFollower={onAddFollower}
                      onRemoveFollower={onRemoveFollower}
                    />
                  }
                </div>
                <textarea
                  value={desc}
                  onChange={t => setDesc(t.target.value)}
                  className='card-title desc'
                ></textarea>
              </div>

              <div className="card-modal-body">
                <div className="card-modal-content">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Due date"
                      value={dueDate}
                      onChange={(newValue) => {
                        setDueDate(newValue);
                      }}
                      renderInput={(params) => {
                        return <TextField size="small" className="due-date"  {...params} />
                      }}
                      open={openDatePicker}
                      onClose={() => setOpenDatePikcer(false)}
                      disableOpenPicker
                    />
                  </LocalizationProvider>
                  <CheckList />
                </div>
                <div className="card-modal-component">
                  <Button onClick={openSelectAssignee} startIcon={<PersonOutline />} className="btn">Assignee</Button>
                  <Button onClick={openSelectFollower} startIcon={<Person />} className="btn">Follower</Button>
                  <Button onClick={() => setOpenDatePikcer(true)} startIcon={<AccessTime />} className="btn">Due date</Button>
                  <Button onClick={openSelectTags} startIcon={<Label />} className="btn">Labels</Button>
                  <Button startIcon={<PlaylistAddCheck />} className="btn">Check List</Button>

                </div>
              </div>
            </CardContent>

            <CardActions style={{ position: 'absolute', bottom: 5, right: 5 }}>
              <Button onClick={saveChange} variant="contained" size="small">Save</Button>
              <Button onClick={handleClose} variant="outlined" size="small">Cancel</Button>
            </CardActions>
          </Card>
        </Box>
      </Modal>
      <SnackBar ref={snackBarRef}/>
    </div>
  );
}

export default React.forwardRef(CardModal)