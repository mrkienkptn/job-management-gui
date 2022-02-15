import './App.css';
import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom";
import { createContext, useContext, useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './components/auth/PrivateRoute';
import Drawer from './components/base_layout/Drawer'
import { ProvideSocket, SocketProvider, socket } from './socket/Context'

const auth = {
  isAuth: false,
  setAuth(cb) {
    auth.isAuth = true
    cb()
  },
  setNotAuth(cb) {
    auth.isAuth = false
    cb()
  }
}
function useProvideAuth() {
  const [authed, setAuthed] = useState(true)
  const setAuth = cb => {
    return auth.setAuth(() => {
      setAuthed(true)
      cb()
    })
  }
  const setNotAuth = cb => {
    return auth.setNotAuth(() => {
      setAuthed(false)
      cb()
    })
  }
  return {
    setAuth,
    setNotAuth,
    authed
  }
}

const authContext = createContext()

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext)
}


function App() {
  return (
    <ProvideSocket>
      <ProvideAuth>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/" component={Drawer} />
          </Switch>
        </Router>
      </ProvideAuth>
    </ProvideSocket>
  );
}

export default App;
