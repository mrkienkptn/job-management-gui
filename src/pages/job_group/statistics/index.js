import * as React from 'react'
import Box from '@mui/material/Box'
import DoughnutChart from './Doughnut'
import './index.css'
const Statistics = props => {

  return (
    <Box style={{width: '100%', padding: 40 }}>
      <DoughnutChart />
    </Box>
  )

}

export default Statistics