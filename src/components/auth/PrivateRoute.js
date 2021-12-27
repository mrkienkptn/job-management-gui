import React, {useState, useEffect, useMemo} from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { useAuth } from '../../App'
const PrivateRoute = ({component: Component, ...rest}) => {
    const auth = useAuth()
    return (
        <Route 
        {...rest}
        render={(props) => auth.authed
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
        }
        />
            
        
    )
}

export default PrivateRoute