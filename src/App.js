import './app.scss'
import {useEffect, useState } from 'react';
import Todo from './todo';

function App() {
  let [task,setTask]=useState("");
  let temarr=JSON.parse(localStorage.getItem('task'));
  let temcount=JSON.parse(localStorage.getItem('count'))
  let [taskArray,setTaskArray]=useState([]);
  let [count,setCount]=useState(temcount?temcount:0);  
  
  useEffect(()=>{
    let i=0; 
    if(!temarr){
      return;
    }

    temarr.forEach((item,index)=>{
      setTimeout(() => {
        setTaskArray((arr)=>{
          return [...arr,item];
        })
      }, 500+index*500);
    })
  
  },[])

  const addTask=(ele)=>{
    if(!ele) return;
    localStorage.setItem("count",count+1);
    setCount(count+1);   
      let curObj={
        taskName:ele,
        id:count,
        isCompleted:false
      };
      
      let newArr=[...taskArray,curObj];
      localStorage.setItem("task",JSON.stringify(newArr)) 
      setTaskArray(newArr);
      setTask("")
  }
  
  const DeleteTask=(item)=>{
    let arrN=[];    
      arrN=taskArray.filter((ele)=>{        
        if(item.id!== ele.id) return ele;
      })    
    
    localStorage.setItem("task",JSON.stringify(arrN)) 
    setTaskArray(arrN);
  }
  
  const completed=(item)=>{
    
    let newArr=taskArray?.map((ele)=>{
      if(ele.id===item.id) item.isCompleted=(item.isCompleted?false:true);
      return ele;
    })    
    
    localStorage.setItem("task",JSON.stringify(newArr)) 
    setTaskArray(newArr);

  }
  return (
    <div className="App" id='app'> 
    <div id="container">
       <h1 id='heading'>Todo List</h1>

      <div id='inputSection'>
       <input type="text" placeholder='Write here...' value={task} onChange={(e)=> setTask(e.target.value)}/>
       <button onClick={()=> addTask(task)}>Add Task</button>
      </div>

       <div id="todos">
        { 
        taskArray?.map((item,index)=>{
            return <Todo item={item} DeleteTask={DeleteTask} key={index} ind={index} completed={completed}/>             
          })
        }
       </div>
      </div>     
    </div>
  );
}

export default App;
