import * as React from 'react'
import { styled } from '@mui/material/styles';
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  Button,
  LinearProgress,
  Card,
  CardActions,
  CardContent,
  Popover,
  TextField,
  IconButton
} from '@mui/material'
import {
  Close
} from '@mui/icons-material'

export default function CheckList() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [newItem, setNewItem] = React.useState('')
  const [items, setItems] = React.useState([
    { name: '1111111111111', value: true },
    { name: '22222222222', value: true },
    { name: '33333333333333', value: false },
    { name: '4444444444444', value: false },
    { name: '5555555555555', value: true },
    { name: '6666666666666666', value: true }
  ])
  // const pCheckList = () => {
  //   if (items && items.length > 0) {
  //     const doneC = items.reduce((z, item)=>{
  //       if (item.value) {
  //         z += 1
  //         return z
  //       }
  //     }, 0)
  //     return doneC / items.length * 100
  //   } else {
  //     return 100
  //   }
    
  // }
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const onCancel = () => {
    handleClose()
    setNewItem('')
  }
  const onAddItem = () => {
    if ( newItem === '') return
    setItems([...items, { name: newItem, value: false }])
    handleClose()
    setNewItem('')
  }
  const onRemoveItem = index => {
    const temp = items.slice()
    setItems([...temp.slice(0, index), ...temp.slice(index+1)])
  }
  return (

    <Box sx={{ flexGrow: 1 }} className="check-list">
      <div>Check list</div>
      <LinearProgress color="secondary" variant="determinate" value={20} style={{ height: 5, borderRadius: 4 }} />
      <FormGroup >
        { items && items.length>0 && items.map((i, index) => (
          <div 
            key={index} 
            style={{
              display:'flex',
              flexDirection:'row',
              justifyContent:'space-between',
              alignItems: 'center'
            }}
            >
            <FormControlLabel 
            control={<Checkbox checked={i.value} size="small" />} 
            label={i.name} />
            <IconButton onClick={()=>onRemoveItem(index)} size="small">
              <Close style={{color: '#ddd'}}/>
            </IconButton>
          </div>
        ))}
      </FormGroup>
      <Button
        size="small"
        className="btn"
        onClick={handleClick}
      >Add an item
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
        <Card sx={{ width: 500 }}>
          <CardContent>
            <TextField
              style={{width:'100%'}}
              label="New item"
              id="outlined-size-small"
              size="small"
              value={newItem}
              onChange={t => setNewItem(t.target.value)}
            />
          </CardContent>
          <CardActions>
            <Button className="btn" onClick={onAddItem} size="small" variant="contained">Add item</Button>
            <Button className="btn" onClick={onCancel} size="small" variant="outlined">Cancel</Button>
          </CardActions>
        </Card>

      </Popover>
    </Box>
  );
}