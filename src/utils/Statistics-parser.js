export const parseData = (orData) => {
  let labels = []
  let data = []
  let backgroundColor = []
  let borderColor = []
  const { processes } = orData 
  const L = processes.length
  for (let i = 0; i < L; i++) {
    labels = [...labels, processes[i].name]
    data = [...data, processes[i].tasks.length]
    const c = (i + 0.5) / L * 255
    let backColor = `rgba(${c}, ${c}, ${c}, 0.2)`
    let border =  `rgba(${c}, ${c}, ${c}, 1)`
    if (processes[i].isFinish) {
      backColor = `rgba(0, 255, 0, 0.2)`
      border = `rgba(0, 255, 0, 1)`
    }
    backgroundColor = [...backgroundColor, backColor]
    borderColor = [...borderColor, border]
  }
  const parsedData = {
    labels,
    datasets: [{
      label: '# of Votes',
      data,
      backgroundColor,
      borderColor,
      borderWidth: 1.5
    }]
  }
  return parsedData
}