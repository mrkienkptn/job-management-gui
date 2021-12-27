import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useRouteMatch } from 'react-router-dom'

import Kanban from './kanban';
import Chat from './chat'
import Statistics from './statistics';
import Members from './member'
import { JobGroupProvider } from './Context'
import GroupContext from '../../components/base_layout/GroupContext'

import { getGroup } from '../../apis/group'

export default function JobGroupTabs() {

  const [value, setValue] = React.useState('1');
  const [groupData, setGroupData] = React.useState({})
  const routeMatch = useRouteMatch(['/chat'])
  const group = React.useContext(GroupContext)
  const currentTab = routeMatch?.path
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleGetGroup = async (groupId) => {
    try {
      const res = await getGroup(groupId)
      setGroupData(res.data.data)
    } catch (error) {

    }
  }
  React.useEffect(() => {
    handleGetGroup(group.groupId)
  },[])
  return (
    <JobGroupProvider value={{ groupData, setGroupData }}>
      <Box sx={{ width: '100%', typography: 'body1', height: `calc(100vh - 64px)`, margin: 0 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', flexDirection:'row', justifyContent: 'space-between', alignItems:'center' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Chat" value="1" />
              <Tab label="Kanban" value="2" />
              <Tab label="List" value="3" />
              <Tab label="Statistics" value="4" />
            </TabList>
            <Members />
          </Box>
          <TabPanel value="1"><Chat /></TabPanel>
          <TabPanel value="2"><Kanban /></TabPanel>
          <TabPanel value="3"></TabPanel>
          <TabPanel value="4"><Statistics /></TabPanel>
        </TabContext>
      </Box>
    </JobGroupProvider>
  );
}
