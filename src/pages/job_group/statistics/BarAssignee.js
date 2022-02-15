import * as React from 'react'
import { Bar } from 'react-chartjs-2'
import Box from '@mui/material/Box'

const BarAssignee = props => {
  const options = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14
          }
        }
      }
    }
  }
  return (
    <Box className="chart-container">
      <h3 style={{textAlign: 'center'}}>Task by assignee</h3>
      <Bar
        data={props.data}
        options={options}
      />
    </Box>
  )
}

export default BarAssignee
