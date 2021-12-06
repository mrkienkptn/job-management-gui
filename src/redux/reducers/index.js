import {combineReducers} from 'redux'
import drawerReducer from './DrawerReducer'
import UserDataReducer from './UserdataReducer'
const rootReducer = combineReducers({
    drawerReducer: drawerReducer,
    UserDataReducer: UserDataReducer
})

export default rootReducer