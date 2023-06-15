import Header from "./components/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import './app.scss'
import { useContext, useEffect } from "react";
import { context } from ".";
import axios from "axios";
import { ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export const baseUrl ='https://backend-todolist-lac.vercel.app/api/v1'


function App() {
  const {setAuthenticated}=useContext(context);

  useEffect(()=>{
      axios.get(`${baseUrl}/user/me`,{withCredentials:true}).then(({data})=> setAuthenticated(data.success)).catch((e)=> console.log(e))
    },[])
  
  return (
    <div className="App">
           
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
          </Routes>
        </Router> 
        <ToastContainer/>           
    </div>
  );
}

export default App;
