import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CardModal from './CardModal';

const KanbanCard = (props) => {
  const { title, description, dragging } = props
  
  const {openModal, setOpenModal} = React.useState(false)
  const modalRef = React.useRef()
  const onOpenModal = () => {
    modalRef.current.openModal()
  }

  return (
    <Card dragging={dragging} sx={{ maxWidth: 345 }}>


      <CardContent>
        <CardActionArea onClick={onOpenModal}>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
        </CardActionArea>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardModal title={title} description={description} ref={modalRef} />
    </Card>
  );
}

export default KanbanCard