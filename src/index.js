import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

export const context=createContext({authenticated: false});

const AppWrapper= ()=>{
  const [authenticated,setAuthenticated]=useState(false);

  return (
    <context.Provider value={{authenticated,setAuthenticated}}>
      <App /> 
    </context.Provider>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <AppWrapper/>
 // </React.StrictMode>
);