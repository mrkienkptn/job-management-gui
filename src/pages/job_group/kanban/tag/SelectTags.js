import * as React from 'react'
import {
  Typography,
  Box,
  Stack,
  Popover,
  Button,
  TextField
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { stringToColor } from '../../../../utils/Avatar.util'

const SelectTags = (props, ref) => {
  const { tags } = props
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  React.useImperativeHandle(ref, () => ({
    openSelectTags(event) {
      handleOpen(event)
    }
  }))
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
            Labels
          </Typography>
          <Box style={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between',
            height: 'calc(100% - 30px)'
            }} >
          <Stack spacing={1}>
            {
              tags && tags.length > 0 && tags.map((tag) => (
                <Button 
                  style={{
                    textTransform:'none',
                    backgroundColor: stringToColor(tag.name),
                    color:'white',
                    justifyContent: 'space-between'
                  }}                    
                  key={tag.id}
                  size="small"
                  endIcon={<CheckIcon />}
                >
                  {tag.name}
                </Button>
              ))
            }
          </Stack>
          <Stack direction='row' spacing={1}>
            <TextField size="small" variant='outlined' placeholder='New Label'/>
            <Button 
              style={{
                textTransform: 'none',
              
              }} 
              size="small" 
              variant='contained'
            >
              Create
            </Button>
          </Stack>
          </Box>
        </Box>
      </Popover>
    </div>
  );
}
export default React.forwardRef(SelectTags)
