export const SELECT_ITEM = 'aschioca'


//action
export const saveDrawerItem = (item)=> ({
  type: SELECT_ITEM,
  payload: item
})


const INIT_STATE = {
    item: []
}

export default function saveDrawerItemReducer (state = INIT_STATE, action){
    switch (action.type){

      case SELECT_ITEM: 
        return {...state, item: action.payload}
      
      default:
        return state
    }
}