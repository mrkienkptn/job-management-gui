import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import { Switch, Route, useHistory } from 'react-router-dom'
import { Badge, Button } from '@mui/material'
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import AddIcon from '@mui/icons-material/Add'
import HomeIcon from '@mui/icons-material/Home'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Typography from '@mui/material/Typography'
import { Avatar } from '@mui/material';
import CreateGroup from '../../pages/create_group'
import JobGroup from '../../pages/job_group'
import DrawerItem from './DrawerItem'
import { stringAvatar } from '../../utils/Avatar.util'
import { getCookie } from '../../utils/cookie'
import { getGroups } from '../../apis/group'
import { GroupProvider } from './GroupContext'
import SocketContext from '../../socket/Context'
import Notifications from '../../pages/notifications'
import './index.css'
const drawerWidth = 250;


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#e5e5e5',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#e5e5e5',
  width: `calc(${theme.spacing(6)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: 'none',
  border: 0,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),

  }),

);

const MiniDrawer = ({ children, ...props }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [jobs, setJobs] = React.useState([])
  const notificationsRef = React.useRef()
  const { socket } = React.useContext(SocketContext)
  const { name, _id: userId } = JSON.parse(getCookie("user"))

  const history = useHistory()
  const handleSignout = () => {
    history.push('/login')
  }
  const openNotifications = () => {
    notificationsRef.current.openModal()
  }

  const joinGroups = (groups) => {
    socket.emit('join-groups', groups)
  }

  const getJobs = async () => {
    try {
      const res = await getGroups()
      const jobs = res.data.data
      setJobs(jobs)
      const groupIds = jobs.map((j) => j._id)
      joinGroups({ groupIds })
    } catch (error) {
      console.log(error)
    }
  }

  const addJob = (newJob) => {
    setJobs([newJob, ...jobs])
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  }
  React.useEffect(() => {
    getJobs()
    return () => {
      socket.disconnect();
    }
  }, [])

  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }} color="secondary.dark">
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ backgroundColor: 'white', color: 'black', borderBottom: '0.5px solid grey' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Switch>
            {
              jobs && jobs.length > 0 && jobs.map((item, index) => (
                <Route key={index + 1} path={`/${item._id}`}>
                  <Typography variant="h6" noWrap component="div">
                    {`${item.name}`}
                  </Typography>
                </Route>
              ))
            }
            <Route path="/create-group">
              <Typography variant="h6" noWrap component="div">
                Create Group
              </Typography>
            </Route>
            <Route path="/">
              <Typography variant="h6" noWrap component="div">
                Home
              </Typography>
            </Route>
          </Switch>
          <div style={{ flexGrow: 1, flexDirection: 'row', textAlign: 'end' }}>
            <IconButton onClick={openNotifications}>
              <Badge color='error' max={9} badgeContent={4}>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Button
              size="small"
              onClick={handleMenu}
              color="inherit"
              endIcon={<Avatar {...stringAvatar(name)} />}
            >
              {name}
            </Button>
          </div>
          <Notifications ref={notificationsRef} />
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleSignout}>Sign out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography variant="h4" align="center">
            My Job
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <DrawerItem
            icon={<HomeIcon />}
            text="Home"
            link="/"
          />
          {jobs && jobs.length > 0 &&
            jobs.map((i, indx) => (
              <DrawerItem
                icon="none"
                text={i.name}
                link={`/${i._id}`}
                key={indx + 3}
              />
            ))
          }
          <DrawerItem
            icon={<AddIcon />}
            text="Create Group"
            link="/create-group"
          />
        </List>
      </Drawer>
      <Box className="main" component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {jobs && jobs.length > 0 &&
          jobs.map((i, indx) => (
            <Route key={indx} path={`/${i._id}`} render={() =>
              <GroupProvider value={{ groupId: i._id, conversation: i.conversation, userId, userName: name }}>
                <JobGroup />
              </GroupProvider>
            }
            />
          ))
        }
        <Route path="/create-group" render={() => <CreateGroup addGroup={addJob} />} />
      </Box>
    </Box>
  );
}

export default MiniDrawer