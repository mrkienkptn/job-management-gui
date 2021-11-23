import * as React from 'react'

const ColumnHeader = (props) => {
  const rename=() => {
    try{
      props.fn.renameColumn("aocihaouo")
    }catch(e){
      console.log(e)
    }
  }
  return(
    <div>
      <button onClick={rename}>AAAA</button>
    </div>
  )
}
export default ColumnHeader