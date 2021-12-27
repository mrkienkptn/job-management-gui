import *  as React from 'react'
import {
  Box,
  Stack,
  Avatar,
  IconButton,
  Tooltip,
  Modal,
  Typography,
  TextField,
  Button,
  Divider
} from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import Member from './Member'
import FoundUser from './FoundUser'
import JobGroupContext from '../Context'

import { stringAvatar } from '../../../utils/Avatar.util'
import { getUsers } from '../../../apis/user'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 500,
  overflowY: 'scroll',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

const Members = props => {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('')
  const [foundUser, setFoundUser] = React.useState([])
  const { groupData, setGroupData } = React.useContext(JobGroupContext)
  const [members, setMembers] = React.useState(groupData.members)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const ms = ["V Viet", "Ngai Kien", "Dinh Le", "SOn Dam sau"]
  const handleChange = async (e) => {
    const { value } = e.target
    setEmail(value)
    if (e.keyCode === 13 && email.length >= 3) {
      try {
        const res = await getUsers(email)
        console.log(res)
      } catch (err) {

      }
    }
  }
  const handleKeyUp = async e => {
    if (e.keyCode === 13 && email.length >= 3) {
      try {
        const res = await getUsers(email)
        if (res.status === 200) {
          setFoundUser(res.data.data)
        }
      } catch (err) {

      }
    }
  }

  React.useEffect(() => {
    console.log(groupData)
  }, [])

  return (
    <Box
      style={{
        paddingRight: 10
      }}
    >
      <Stack direction='row' spacing={1}>
        <Tooltip title="Add member">
          <IconButton onClick={handleOpen} style={{ width: 25, height: 25 }}>
            < AddCircleOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>
        {
          ms.map((m, index) => (
            <Avatar style={{ fontSize: 14, width: 25, height: 25 }} {...stringAvatar(m)} key={index} />
          ))
        }
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography style={{marginBottom: 15}} textAlign={"center"} id="modal-modal-title" variant="h6" component="h2">
            Members
          </Typography>
          <Stack spacing={2} >
            <Stack  direction="row" spacing={2} justifyContent="space-between">
              <TextField 
                style={{flexGrow: 1}} 
                placeholder='Email' 
                size='small' 
                type="email" 
                id="outlined-basic" 
                label="Add Member" 
                variant="outlined" 
                value={email} 
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                />
              <Button style={{ boxShadow: 'none' }} size="small" variant="contained">Add Member</Button>
            </Stack>
            
            {
              foundUser && foundUser.length > 0 && foundUser.map((m, index) => (
                <FoundUser data={m.name} key={index} />
              ))
            }
            <Divider>Members</Divider>
            {
              ms.map((m, index) => <Member data={m} key={index} />)
            }
          </Stack>
        </Box>
      </Modal>
    </Box>
  )
}

export default Members