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
      const {data}= await axios.put(`${baseUrl}/task/${task._id}`,{},{headers: {'Content-Type': 'application/json'},withCredentials:true});
      toast.success(data.message);            
    } catch (error) {
      setChecked(!checked);      
      toast.error(error.response.data.message);
    }
  }
  const deleteTask=async ()=>{
     setIsDeleted(true);
      try {
        const {data} =await axios.delete(`${baseUrl}/task/${task._id}`,{withCredentials:true});
      toast(data.message);          
    } catch (error) {      
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
           <div className='circle checked' onClick={()=>update()}>&#x2713;</div>
           :<div className='circle' onClick={()=> update()}>&nbsp;</div>
           }          
          <div className='delete' onClick={()=>deleteTask(task._id)}>Delete</div>
        </div>
    </div>
  )
}
