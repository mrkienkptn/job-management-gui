import * as React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link, useHistory } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import { stringAvatar } from '../../utils/Avatar.util';

const DrawerItem = (props) => {
  const { icon, text, link } = props
  const [selected, setSelected] = React.useState(false)
  const history = useHistory()
  const onSelect = () => {
    setSelected(true)
  }
  React.useEffect(() => {

    if (history.location.pathname === "/" && link === "/") {
      setSelected(true)
    } else {
      if (link === "/") {
        setSelected(false)
        return
      }

      let matchRoute = history.location.pathname.includes(link)

      setSelected(matchRoute)
    }

  }, [history.location.pathname])

  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <ListItemButton
        style={{ borderRadius:5, marginBottom: 4}}
      onClick={onSelect} selected={selected}>
        {icon !== "none" &&
          <ListItemIcon>
            {icon}
          </ListItemIcon>
        }
        {
          icon !== "none" &&
          <ListItemText primary={text}  />
        }
        {
          icon === "none" &&
          <Avatar  {...stringAvatar(text)} />
        }
        {
          icon === "none" &&
          <ListItemText primary={text} style={{marginLeft: 15}} />
        }
        
        
      </ListItemButton>
    </Link>
  )
}

export default DrawerItem