import React, { useContext, useState } from 'react'
import './register.scss'
import { Link, Navigate} from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from '../../App'
import Spinner from '../../components/spinner/Spinner'
import { context } from '../..';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Visibility, VisibilityOff } from '@mui/icons-material'

export default function Register() {  
  const [loading,setLoading]=useState(false);
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('');
  const [passwordType,setPasswordType]=useState('password');
  const {authenticated,setAuthenticated}= useContext(context);

  const handleSubmit=async (e)=>{    
    setEmail("");
    setName("");
    setPassword("");    
    setLoading(true);
    try {
      const {data}= await axios.post(`${baseUrl}/user/register`, {name,email,password},{headers:{"Content-Type": "application/json"},withCredentials:true,})

      toast(data.message);
      setAuthenticated(data.success);                      
      setLoading(false) 
      console.clear()                    
    } catch (error) {        
      toast.error(error.response.data.message)
      setLoading(false);
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
          <h2>Register</h2>
            {loading ? 
                <Spinner/>
                : 
                <div id="main" className='center'>
                  <input type="text" name='name' placeholder='Name' onChange={(e)=> setName(e.target.value)} value={name} required />
                  <input type="email" name='email'placeholder='Email' onChange={(e)=> setEmail(e.target.value)} value={email} required />
                  <div className="eye">
                    <input type={passwordType} name="password" id="" placeholder='Password' onChange={(e)=> setPassword(e.target.value)} value={password} required={true} />
                    {passwordType==="password" ? <Visibility onClick={()=> setPasswordType('text')}/>
                      :  
                    <VisibilityOff onClick={()=> setPasswordType('password')}/>
                  }
                  </div>
                  <button className="btn" onClick={handleSubmit} >Register</button>
                </div>
            }
          <div id='bottom'>Already have an account , <Link to={'/login'} >Login</Link></div>
        </section>       
    </div>
  )
}
