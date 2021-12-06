import React, {useState, useEffect} from 'react'
import {Route, Redirect} from 'react-router-dom'
const VALID_ID = /^[a-f 0-9]{24}$/i
const PrivateRoute = ({component: Component, ...rest}) => {
    const [auth, setAuth] = useState(true);
    const checkAuth = () => {
        try {
            const token = localStorage.getItem('token')
            if ( token === null){
                setAuth(false);
            } 
        } catch (error) {
            setAuth(false)
        }
    }
    useEffect(()=> {
        checkAuth()
    },[window.location])
    return (
        <Route 
        {...rest}
        render={() => auth
            ? <Component />
            : <Redirect to='/login'/>
        }
        />
            
        
    )
}

export default PrivateRoute