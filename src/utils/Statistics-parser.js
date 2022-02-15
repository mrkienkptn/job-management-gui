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

export const parseAssignee = (orData) => {
  let labels = []
  let data = []
  let backgroundColor = []
  let borderColor = []
  let tasks = []
  let assignees = []
  const assigneeTaskCount = {}
  const { processes, members } = orData 
  const LP = processes.length
  const LM = members.length
  for (let i=0; i < LP; i++) {
    tasks = [...tasks, ...processes[i].tasks]
  }
  for (let i=0; i< tasks.length; i++) {
    assignees = [...assignees, ...tasks[i].assignees]
  }
  for (let i=0; i< assignees.length; i++) {
    const aId = assignees[i].name
    if (assigneeTaskCount[aId] === undefined) {
      assigneeTaskCount[aId] = 1
    } else {
      assigneeTaskCount[aId] += 1
    }
  }
  for (let i=0; i< LM; i++) {
    labels = [...labels, members[i].name]
    if (assigneeTaskCount[members[i].name] !== undefined) {
      data = [...data, assigneeTaskCount[members[i].name]]
    }
    else {
      data = [...data, 0]
    }
    const r = Math.random() * 255
    const g = Math.random() * 255
    const b = Math.random() * 255
    let backColor = `rgba(${r}, ${g}, ${b}, 0.2)`
    let border =  `rgba(${r}, ${g}, ${b}, 1)`
    backgroundColor = [...backgroundColor, backColor]
    borderColor = [...borderColor, border]
  }
  const parsedData = {
    labels,
    datasets: [{
      label: 'Tasks',
      data,
      backgroundColor,
      borderColor,
      borderWidth: 1.5
    }]
  }
  return parsedData
}