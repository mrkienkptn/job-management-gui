import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

export default function IconLabelButtons(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [columnTitle, setColumnTitle] = React.useState('')
  const [addStatus, setAddStatus] = React.useState()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const onAddColumn = () => {
    if (columnTitle === ''){
      return
    }
    props.addNewColumn({
      name: columnTitle
    })
    setColumnTitle('')
    handleClose()
  }
  const onCancel = () => {
    handleClose()
    setColumnTitle('')
  }
  return (
    <div>
      <Button
        onClick={handleClick}
        variant="outlined"
        startIcon={<AddIcon />}
        style={{ width: 250, marginTop: 5 }}
      >
        Add onther list
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
              label="Title"
              id="outlined-size-small"
              size="small"
              value={columnTitle}
              onChange={t => setColumnTitle(t.target.value)}
            />
          </CardContent>
          <CardActions>
            <Button onClick={onAddColumn} size="small" variant="contained">Add List</Button>
            <Button onClick={onCancel} size="small" variant="outlined">Cancel</Button>
          </CardActions>
        </Card>

      </Popover>
     
    </div>

  );
}