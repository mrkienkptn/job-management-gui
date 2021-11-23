import * as React from 'react'
import Box from '@mui/material/Box';
import Board, { addCard, addColumn } from '@asseinfo/react-kanban'
import '@asseinfo/react-kanban/dist/styles.css'
import KanbanCard from './KanbanCard';
import ColumnAdder from './ColumnAdder'
import ColumnHeader from './ColumnHeader';
import './index.css'

const Kanban = (props) => {
  const board = {
    columns: [
      {
        id: 1,
        title: 'Backlog',
        cards: [
          {
            id: 1,
            title: 'Add card',
            description: 'Add capability to add '
          },
        ]
      },
      {
        id: 2,
        title: 'Doing',
        cards: [
          {
            id: 2,
            title: 'Drag-2-drop support',
            description: 'Move a card between the columns'
          },
          {
            id: 3,
            title: 'Drag-3-drop support',
            description: 'Move a card between the columns'
          }
        ]
      }
    ]
  }

  const onColumnNew = (p) => {
    console.log(p)
  }
  const onColumnRename = (x) => {
    console.log(x)
  }
  const onCardNew = (n) => {
    console.log(n)
  }
  return (
    <Box>
      <Board
        allowAddColumn
        allowRemoveLane
        initialBoard={board}
        allowRenameColumn
        allowAddCard={{ on: "bottom" }}
        onColumnNew={onColumnNew}
        onColumnRename={onColumnRename}
        onNewColumnConfirm={draft => (
          {
            id: new Date().getTime(),
            ...draft
          }
        )}
        renderColumnAdder={({addColumn}) => <ColumnAdder addColumn={addColumn}/>}
        
        onCardNew={onCardNew}
        onNewCardConfirm={draftCard => ({
          id: new Date().getTime(),
          ...draftCard
        })}
        renderCard={({ title, description }, { removeCard, dragging }) => (
          <KanbanCard
            dragging={dragging.toString()}
            title={title}
            description={description}
          />
        )}
      />


    </Box>
  )
}

export default Kanban