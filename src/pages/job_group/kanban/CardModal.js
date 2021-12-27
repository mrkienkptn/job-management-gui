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
  IconButton
} from '@mui/material'
import {
  PersonOutline,
  PlaylistAddCheck,
  AccessTime,
  Person,
  Label,
  Description,
  Add as AddIcon
} from '@mui/icons-material'
import {
  DatePicker,
  LocalizationProvider
} from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import CheckList from './CheckList'
import Tag from './Tag'
import SelectTags from './SelectTags'
import './index.css'


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
  const { title, description } = props
  const [open, setOpen] = React.useState(false);
  const [dueDate, setDueDate] = React.useState(null)
  const [openDatePicker, setOpenDatePikcer] = React.useState(false)
  const selectTagsRef = React.useRef()
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tags, setTags] = React.useState([{ id: 1, name: 'Copy re' }, { id: 2, name: 'Need Authen' }, { id: 3, name: 'tag3' }])
  const clickTag = (id) => {

  }
  const deleteTag = (id) => {
    // const updateTags = tags.reduce(())
  }
  const openSelectTags = (event) => {
    selectTagsRef.current.openSelectTags(event)
  }
  React.useImperativeHandle(ref, () => ({
    openModal() {
      handleOpen()
    }
  }))
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
          <Card style={{ width: '100%', height: '100%' }}>
            <CardContent>
              <div style={{}}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  suppressContentEditableWarning
                  contentEditable={true}>
                  {title}
                </Typography>
                <div style={{ margin: '15px 0px' }}>
                  <span>Project: </span>
                  <span style={{ fontWeight: 'bold' }}>Project Name</span>
                </div>
                <div>
                  <p style={{margin:0}}>Labels</p>
                  <Stack direction="row" spacing={1} style={{ marginBottom: 15}}>
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
                      style={{backgroundColor:'#eaecf0'}}
                      onClick={openSelectTags}
                    >
                      <AddIcon fontSize="inherit"/>
                    </IconButton>
                  </Stack>
                  <SelectTags tags={tags}  ref={selectTagsRef}/>
                </div>



                <Typography
                  variant="body2"
                  color="text.secondary"
                  suppressContentEditableWarning
                  contentEditable={true}>
                  {description}
                </Typography>
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
                  <Button startIcon={<PersonOutline />} className="btn">Assignee</Button>
                  <Button startIcon={<Person />} className="btn">Follower</Button>
                  <Button onClick={() => setOpenDatePikcer(true)} startIcon={<AccessTime />} className="btn">Due date</Button>
                  <Button onClick={openSelectTags} startIcon={<Label />} className="btn">Labels</Button>
                  <Button startIcon={<PlaylistAddCheck />} className="btn">Check List</Button>

                </div>
              </div>
            </CardContent>

            <CardActions style={{ position: 'absolute', bottom: 5, right: 5 }}>
              <Button variant="contained" size="small">Save</Button>
              <Button onClick={handleClose} variant="outlined" size="small">Cancel</Button>
            </CardActions>
          </Card>
        </Box>
      </Modal>
    </div>
  );
}

export default React.forwardRef(CardModal)