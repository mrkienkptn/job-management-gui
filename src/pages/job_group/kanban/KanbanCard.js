import * as React from 'react'
import {
  CardActionArea,
  Stack,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar
} from '@mui/material'
import CardModal from './CardModal'
import JobGroupContext from '../Context'
import {
  updateTask,
  addAssignee,
  removeAssignee,
  addFollower,
  removeFollower,
  getTask
} from '../../../apis/task'

import { stringAvatar } from '../../../utils/Avatar.util'

const KanbanCard = (props) => {
  const { id, title, description, dragging } = props
  const { groupData, setGroupData } = React.useContext(JobGroupContext)
  const [taskDetail, setTaskDetail] = React.useState({})
  const [dueDate, setDueDate] = React.useState(null)
  const modalRef = React.useRef()
  const onOpenModal = () => {
    modalRef.current.openModal()
  }
  const getTaskDetail = async () => {
    try {
      const res = await getTask(groupData._id, id)
      if (res.status === 200) {
        setTaskDetail(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const [tags, setTags] = React.useState([{ id: 1, name: 'Copy re' }, { id: 2, name: 'Need Authen' }, { id: 3, name: 'tag3' }])
  const clickTag = (id) => {

  }
  const deleteTag = (id) => {
    // const updateTags = tags.reduce(())
  }

  const onAddAssignee = async (data) => {
    const { _id: userId } = data
    try {
      const res = await addAssignee(groupData._id, id, userId)
      if (res.status === 200) {
        setTaskDetail(res.data.data)

      }
    } catch (error) {
      console.log(error)
    }
  }
  const onRemoveAssignee = async (data) => {
    const { _id: userId } = data
    try {
      const res = await removeAssignee(groupData._id, id, userId)
      if (res.status === 200) {
        setTaskDetail(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onAddFollower = async (data) => {
    const { _id: userId } = data
    try {
      const res = await addFollower(groupData._id, id, userId)
      if (res.status === 200) {
        setTaskDetail(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const onRemoveFollower = async (data) => {
    const { _id: userId } = data
    try {
      const res = await removeFollower(groupData._id, id, userId)
      if (res.status === 200) {
        setTaskDetail(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onSaveChange = async (data) => {
    try {
      console.log(data)
      if (data.title === '' || data.description === '') {
        return
      }
      const res = await updateTask(groupData._id, id, data)
      if (res.status === 200) {
        setTaskDetail(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const computeDate = (dateString) => {
    if (dateString === undefined) return null
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }
  React.useEffect(() => {
    getTaskDetail()
  }, [])
  return (
    <Card dragging={dragging} sx={{ maxWidth: 345 }}>


      <CardContent>
        <CardActionArea onClick={onOpenModal}>
          <Typography gutterBottom style={{fontWeight:'bold'}} component="div">
            { taskDetail.title ? taskDetail.title : title }
          </Typography>
        </CardActionArea>
        <Stack direction={"row"} spacing={1}>
          {
            taskDetail.assignees && taskDetail.assignees.length > 0 && taskDetail.assignees.map((assignee, index) => (
              <Avatar key={index} style={{ fontSize: 11, width: 20, height: 20 }} {...stringAvatar(assignee.name)} />
            )) 
          }
        </Stack>
        {/* <Typography variant="body2" color="text.secondary">
          {description}
        </Typography> */}
        {
          taskDetail.dueDate !== null && 
          <Typography
            style={{
              marginTop: 10,
              fontSize: 12,
              fontWeight: 'bold',
              color: new Date().getTime() > new Date(taskDetail.dueDate).getTime() ? 'red' : 'green'
            }}
          >
            {
              computeDate(taskDetail.dueDate)
            }
          </Typography>
        }
      </CardContent>
      <CardModal
        data={{ id, title, description, taskDetail }}
        ref={modalRef}
        onAddAssignee={onAddAssignee}
        onRemoveAssignee={onRemoveAssignee}
        onAddFollower={onAddFollower}
        onRemoveFollower={onRemoveFollower}
        onSaveChange={onSaveChange}
      />
    </Card>
  );
}

export default KanbanCard