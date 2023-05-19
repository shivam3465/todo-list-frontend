import './todo.scss'
import React, { useState } from 'react'
import axios from 'axios';
import { baseUrl } from '../../App';
import { toast } from 'react-toastify';

export default function Todo({task}) {
  const [checked,setChecked]=useState(false);
  const [isDeleted,setIsDeleted]=useState(false);

  const update=async ()=>{
    try {
      setChecked(!checked);
      const {data} =await axios.put(`${baseUrl}/task/${task._id}`,{},{headers: {'Content-Type': 'application/json'},withCredentials:true});
      console.log(data)            
    } catch (error) {
      setChecked(!checked);
      console.log(error)
    }
  }
  const deleteTask=async ()=>{
     setIsDeleted(true);
      try {
        const {data} =await axios.delete(`${baseUrl}/task/${task._id}`,{withCredentials:true});
      console.log(data) 
      toast(data.message);          
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }  
  return (
    <div className='task center' style={{display:isDeleted && "none"}}>
        <div className="content">
          <div className="title">{task.title}</div>
          <div className="desc">{task.desc}</div>
        </div>
        <div className='center tools'>          
          {task.completed || checked?
           <div className='circle checked' onClick={()=>update(task._id)}>&#x2713;</div>
           :<div className='circle' onClick={()=> update(task._id)}>&nbsp;</div>
           }          
          <div className='delete' onClick={()=>deleteTask(task._id)}>Delete</div>
        </div>
    </div>
  )
}
