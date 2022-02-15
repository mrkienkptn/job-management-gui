import * as React from 'react'
import Box from '@mui/material/Box'
import JobGroupContext from '../Context'
import DoughnutChart from './Doughnut'
import BarAssignee from './BarAssignee'
import { parseData, parseAssignee } from '../../../utils/Statistics-parser'
import './index.css'
const Statistics = props => {
  const { groupData, setGroupData } = React.useContext(JobGroupContext)
  const [parsedData, setParsedData] = React.useState(parseData(groupData))
  const [parsedAssigneeData, setParsedAssigneeData] = React.useState(parseAssignee(groupData))

  React.useEffect(() => {
    console.log(parseAssignee(groupData))
  }, [])
  return (
    <Box className='charts' style={{width: '100%', padding: 40 }}>
      <DoughnutChart
        name={groupData.name}
        data={parsedData}
      />
      <BarAssignee
        data={parsedAssigneeData}
      />
    </Box>
  )

}

export default Statistics