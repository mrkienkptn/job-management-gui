import * as React from 'react'
import {
  Typography,
  Box,
  Stack,
  Popover
} from '@mui/material'
import Follower from './Follower'
import NotFollower from './NotFollower'
import { difference } from '../../../../utils/array' 

const SelectFollower = (props, ref) => {
  const { data: { members, followers }, onAddFollower, onRemoveFollower } = props
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notFollowers, setNotFollowers] = React.useState([])
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  React.useImperativeHandle(ref, () => ({
    openSelectFollower(event) {
      handleOpen(event)
    }
  }))
  React.useEffect(() => {
    const notAss = difference(members, followers)
    setNotFollowers(notAss)
  }, [followers])
  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box style={{ width: 250, height: 350, padding: 10 }} >
          <Typography style={{
            fontSize:16,
            fontWeight:'bold',
            marginBottom: 5,
            height: 30
          }}>
            Followers
          </Typography>
          <Box style={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between',
            height: 'calc(100% - 30px)'
            }} >
          <Stack spacing={1}>
            {
              notFollowers && notFollowers.length > 0 && notFollowers.map((member, index) => (
                <NotFollower onAddFollower={onAddFollower} data={member} key={index} />
              ))
            }
            {
              followers && followers.length > 0 && followers.map((member, index) => (
                <Follower onRemoveFollower={onRemoveFollower} data={member} key={index} />
              ))
            }
          </Stack>
          </Box>
        </Box>
      </Popover>
    </div>
  );
}
export default React.forwardRef(SelectFollower)
