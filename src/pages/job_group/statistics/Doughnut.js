import * as React from 'react'
import {Doughnut} from 'react-chartjs-2'
import Box from '@mui/material/Box'
const DoughnutChart= props => {
  const data = {
    labels: ['Todo', 'In progress', 'Done'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1.5,
      },
    ],
  };
      
  return (
    <Box className="chart-container">
      <h3>Doughnut Chart</h3>
      <Doughnut  data={data} />
    </Box>
  )

}

export default DoughnutChart