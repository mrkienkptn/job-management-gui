import * as React from 'react'
import Box from '@mui/material/Box'
import JobGroupContext from '../Context'
import DoughnutChart from './Doughnut'
import { parseData } from '../../../utils/Statistics-parser'
import './index.css'
const Statistics = props => {
  const { groupData, setGroupData } = React.useContext(JobGroupContext)
  const [parsedData, setParsedData] = React.useState(parseData(groupData))
  React.useEffect(() => {
  }, [])
  return (
    <Box style={{width: '100%', padding: 40 }}>
      <DoughnutChart
        name={groupData.name}
        data={parsedData}
      />
    </Box>
  )

}

export default Statistics