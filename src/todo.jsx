import React from 'react'

export default function todo({item,DeleteTask,ind,completed}) {  
  return (
    <div className='todo' style={{backgroundColor: (item.isCompleted ?"green":"white") ,color: (item.isCompleted ?"white":"black")}}>
      {item.taskName}
      <div>
        <button onClick={()=> DeleteTask(item)} id='delete'>Delete</button>
        <button onClick={()=> completed(item)} id='done'>Done</button>
      </div>
    </div>
  )
}
