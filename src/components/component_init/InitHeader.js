import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PublicRoute from '../auth/PublicRoute'



export const InitHeader = props => {
  const drawerItems = useSelector((state => state.drawerReducer.item))
  const [items, setItems] = React.useState([])
  React.useEffect(() => {
    setItems(drawerItems)
  }, [])
  return (
    <Switch>

      <Route path="/">
        <Typography variant="h6" noWrap component="div">
          Trang chủvds
        </Typography>
      </Route>

      {/* <Route path="/create-job">
        <Typography variant="h6" noWrap component="div">
          Tạo công việc
        </Typography>
      </Route>

      <Route path="/create-group">
        <Typography variant="h6" noWrap component="div">
          Tạo nhóm chat
        </Typography>

      </Route> */}
      {
        items && items.length > 0 && items.map((item, index) => (
          <Route key={index+4} path={`/${item.id}`}>
            <Typography variant="h6" noWrap component="div">
              {`${item.name}`}
            </Typography>
          </Route>
        ))
      }

    </Switch>
  )
}
export default InitHeader