import React, { useContext } from 'react'
import './header.scss'
import { Link} from 'react-router-dom'
import { baseUrl} from '../../App'
import axios from 'axios';
import { context } from '../..';
import { toast} from 'react-toastify';

const logout=async (setAuthenticated)=>{
  await axios.get(`${baseUrl}/user/logout`,{
    headers:{"content-type": "application/json"},
    withCredentials: true
  });
  // console.log("logout success ",data);
  toast("Logout successfully")
  setAuthenticated(false);
}
const userProfile=async()=>{
  const {data}=await axios.get(`${baseUrl}/user/me`,{
    headers:{"content-type": "application/json"},
    withCredentials: true
  });
  console.log("profile data ",data)
}

export default function Header() {
  const {authenticated,setAuthenticated}=useContext(context);  
  
  return (
    <div id='header'>
            <Link to={'/'}>
              <div id="left">Todo List</div>
            </Link>
        <div id="right">
            <Link to={'/'}className='items'>Home</Link>
            {
              authenticated ?  
                <div>
                  <div onClick={()=>logout(setAuthenticated)} className='items'>Logout</div>
                  <div onClick={userProfile} className='items'>Profile</div>
                </div>
                  :                
                <Link to={'/login'} className='items'>Login</Link>                
            }
        {/* <ToastContainer/> */}
        </div>
    </div>
  )
}
