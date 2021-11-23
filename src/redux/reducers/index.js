import {combineReducers} from 'redux'
import drawerReducer from './DrawerReducer'

const rootReducer = combineReducers({
    drawerReducer: drawerReducer,

})

export default rootReducer