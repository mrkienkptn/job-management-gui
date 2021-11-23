import './App.css';
import {
  BrowserRouter as Router,  Route,  Link, Switch
} from "react-router-dom";

// import Drawer from './components/base_layout/Drawer'
import {} from '@mui/material/SwipeableDrawer'

import Login from './pages/Login'
import Register from './pages/Register'
import PublicRoute from './components/auth/PublicRoute';
import Drawer from './components/base_layout/Drawer'

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute path="/login" component={Login}/>
        <PublicRoute path="/register" component={Register}/>
        <PublicRoute path="/" component={Drawer} />
      </Switch>
    </Router>
  );
}

export default App;
