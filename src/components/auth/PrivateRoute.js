import React, {useState, useEffect} from 'react'
import {Route, Redirect} from 'react-router-dom'
const VALID_ID = /^[a-f 0-9]{24}$/i
const PrivateRoute = ({component: Component, ...rest}) => {
    const [auth, setAuth] = useState(true);

    useEffect(()=> {
        const token = localStorage.getItem('token')
        const userId = JSON.parse(localStorage.getItem('user'))._id
        const isValidId = VALID_ID.test(userId)
        console.log(userId)
        if (userId === null || !isValidId || token === null){
            setAuth(false);
        } 
    },[window.location])
    return (
        <Route {...rest}>
            {!auth ? <Redirect to = "/login"/>: <Component />}
        </Route>
    )
}

export default PrivateRoute