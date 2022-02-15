import * as React from 'react'
import {
  Typography,
  Box,
  Stack,
  Popover
} from '@mui/material'
import Assignee from './Assignee'
import NotAssignee from './NotAssignee'
import { difference } from '../../../../utils/array' 

const SelectAssignee = (props, ref) => {
  const { data: { members, assignees }, onAddAssignee, onRemoveAssignee } = props
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notAssignees, setNotAssignees] = React.useState([])
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  React.useImperativeHandle(ref, () => ({
    openSelectAssignee(event) {
      handleOpen(event)
    }
  }))
  React.useEffect(() => {
    const notAss = difference(members, assignees)
    setNotAssignees(notAss)
  }, [assignees])
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
            Assignees
          </Typography>
          <Box style={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between',
            height: 'calc(100% - 30px)'
            }} >
          <Stack spacing={1}>
            {
              notAssignees && notAssignees.length > 0 && notAssignees.map((member, index) => (
                <NotAssignee onAddAssignee={onAddAssignee} data={member} key={index} />
              ))
            }
            {
              assignees && assignees.length > 0 && assignees.map((member, index) => (
                <Assignee onRemoveAssignee={onRemoveAssignee} data={member} key={index} />
              ))
            }
          </Stack>
          </Box>
        </Box>
      </Popover>
    </div>
  );
}
export default React.forwardRef(SelectAssignee)
