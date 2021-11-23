import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {useRouteMatch} from 'react-router-dom'
import Kanban from './kanban';


export default function JobGroupTabs() {
  const [value, setValue] = React.useState('1');
  const routeMatch = useRouteMatch(['/chat'])
  const currentTab = routeMatch?.path
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Chat"  value="1" />
            <Tab label="Kanban" value="2" />
            <Tab label="List" value="3" />
            <Tab label="Statistics" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">Chat</TabPanel>
        <TabPanel value="2"><Kanban/></TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
}
