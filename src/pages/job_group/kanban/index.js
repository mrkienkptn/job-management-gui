import * as React from 'react'
import Box from '@mui/material/Box';
import Board, {
  addCard,
  addColumn,
  moveCard,
  moveColumn,
  removeColumn
} from '@asseinfo/react-kanban'
import '@asseinfo/react-kanban/dist/styles.css'
import KanbanCard from './KanbanCard';
import ColumnAdder from './ColumnAdder'
import ColumnHeader from './ColumnHeader';
import SnackBar from '../../../utils/SnackBar'
import './index.css'
import GroupContext from '../../../components/base_layout/GroupContext'
import JobGroupContext from '../Context'
import { createProcess, dragTask, removeProcess } from '../../../apis/process'
import { dragProcess } from '../../../apis/group'
import { renameKey } from '../../../utils/Object'

const Kanban = (props) => {
  const group = React.useContext(GroupContext)
  const { groupData, setGroupData } = React.useContext(JobGroupContext)
  const [board, setBoard] = React.useState({
    columns: []
  })
  const snackBarRef = React.useRef()

  const saveNewColumn = async (newColumn) => {
    try {
      const res = await createProcess(group.groupId, newColumn)
      return res.data.data
    } catch (error) {
      return null
    }
  }
  const addNewColumn = async (column) => {
    const updatedGroup = await saveNewColumn(column)
    setGroupData(updatedGroup)
  }
  const loadColumn = () => {
    console.log("load column")
    let columns = groupData.processes
    
    let data = { columns: [] }
    for (let i = 0; i < columns.length; i++) {
      for (let j = 0; j < columns[i].tasks.length; j++) {
        columns[i].tasks[j].id = columns[i].tasks[j]._id
      }
      data = addColumn(data, {
        id: columns[i]._id,
        title: columns[i].name,
        cards: columns[i].tasks,
        isFinish: columns[i].isFinish
      })
    }
    setBoard(data)
  }

  const onColumnRename = (x) => {
    console.log(x)
  }

  const onColumnDragEnd = async (column, src, des) => {
    const updatedBoard = moveColumn(board, src, des)
    setBoard(updatedBoard)
    const payload = {
      processId: column.id,
      ...src,
      ...des
    }
    try {
      const res = await dragProcess(group.groupId, payload)
      if (res.status === 200) {
        setGroupData(res.data.data)
      } else {
        snackBarRef.current.openSnackBar()
      }
    } catch (err) {
      snackBarRef.current.openSnackBar()
    }
  }

  const deleteColumn = async (column) => {
    const updatedBoard = removeColumn(board, column)
    setBoard(updatedBoard)
    try {
      const res = await removeProcess(group.groupId, column.id)
      if (res.status === 200) {
        console.log(res.data)
      } else {

      }
    } catch (error) {

    }
  }

  const addNewCard = (column, card) => {
    const updatedBoard = addCard(board, column, card)
    setBoard(updatedBoard)
  }

  const onCardDragEnd = async (card, src, des) => {
    const updatedBoard = moveCard(board, src, des)
    setBoard(updatedBoard)
    const payload = {
      cardId: card.id,
      ...src,
      ...des
    }
    console.log(payload)
    try {
      const res = await dragTask(group.groupId, payload)
      if (res.status === 200) {      
        setGroupData(res.data.data)
      } else {
        snackBarRef.current.openSnackBar()
      }    
    } catch(err) {
      snackBarRef.current.openSnackBar()
    }
    
  }
  React.useEffect(() => {
    loadColumn()
  }, [])
  return (
    <Box style={{height:'100%'}}>
      <Board
        children={board}  
        renderCard={({ title, description }, { removeCard, dragging }) => (
          <KanbanCard
            dragging={dragging.toString()}
            title={title}
            description={description}
          />
        )}
        onCardDragEnd={onCardDragEnd}

        allowRemoveLane
        allowAddColumn
        allowRenameColumn
        onColumnRename={onColumnRename}
        renderColumnAdder={(columnBag) =>
          <ColumnAdder 
            addColumn={columnBag}
            addNewColumn={addNewColumn}
          />
        }
        renderColumnHeader={(column) => 
          <ColumnHeader
            groupId={group.groupId}
            column={column} 
            addNewCard={addNewCard}
            setGroupData={setGroupData}
            deleteColumn={deleteColumn}
          />
        }
        onColumnDragEnd={onColumnDragEnd}
      />
      <SnackBar  ref = { snackBarRef } />
    </Box>
  )
}

export default Kanban