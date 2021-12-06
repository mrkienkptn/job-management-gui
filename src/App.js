import './App.css';
import {
  BrowserRouter as Router, Switch
} from "react-router-dom";
import Login from './pages/Login'
import Register from './pages/Register'
import PublicRoute from './components/auth/PublicRoute';
import PrivateRoute from './components/auth/PrivateRoute';
import Drawer from './components/base_layout/Drawer'

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute path="/login" component={Login}/>
        <PublicRoute path="/register" component={Register}/>
        <PrivateRoute path="/" component={Drawer} />
      </Switch>
    </Router>
  );
}

export default App;
