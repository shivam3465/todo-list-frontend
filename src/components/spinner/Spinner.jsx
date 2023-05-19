import React from 'react'
import './spinner.scss';

export default function Spinner({color='rgb(255, 255, 255)'}) {
  return (
    <div id='spinner-container'>
      <div id="spinner" style={{border:`2px solid ${color}`,borderTop:"none",borderRight:"none"}}>      
      </div>
    </div>
  );
}