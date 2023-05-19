import React, { useContext, useState } from 'react'
import './login.scss'
import { Link, Navigate} from 'react-router-dom'
import { baseUrl} from '../../App';
import axios from 'axios';
import Spinner from '../../components/spinner/Spinner';
import { context } from '../..';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Visibility, VisibilityOff } from '@mui/icons-material'

export default function Login() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('');
  const [loading,setLoading]=useState(false);
  const [passwordType,setPasswordType]=useState('password');
  const {authenticated,setAuthenticated}= useContext(context);
  // const navigate=useNavigate();
  
  const handleSubmit=async (e)=>{
    setEmail("");    
    setPassword(""); 
    if(authenticated) {
      console.log("user is authenticated");
    }   
    setLoading(true);
    try {
      const {data}= await axios.post(`${baseUrl}/user/login`, {email,password},{headers:{"Content-Type": "application/json"},withCredentials:true,})
      
      toast(data.message);      
      setAuthenticated(true);          
      setLoading(false)
      console.clear();      
    } catch (error) {      
      toast.error(error.response.data.message)
      setLoading(false)
      setAuthenticated(false);
    }
  }
  window.onkeydown=(e)=>{
    if(e.key ==='Enter') handleSubmit();
  }
   
  if(authenticated) return <Navigate to={'/'}/>
  return (
    <div className='container' id='container'>     
        <section className='form center'>
          <h2>Login</h2>
          {loading ? <Spinner/>: 
            <div id="main" className='center'>
              <input type="email" name='email'placeholder='Email' required onChange={(e)=> setEmail(e.target.value)} value={email}/>
              <div className="eye">
                  <input type={passwordType} name="password" id="" placeholder='Password' onChange={(e)=> setPassword(e.target.value)} value={password} required />
                  {passwordType==="password" ? <Visibility onClick={()=> setPasswordType('text')}/>
                    :  
                  <VisibilityOff onClick={()=> setPasswordType('password')}/>
                }
                </div>
              <button className="btn"  onClick={handleSubmit}>Login</button>
            </div>
          }
          <div id='bottom'>Don't have an account , <Link to={'/register'} >Register Now</Link></div>
        </section>      
    </div>
  )
}
