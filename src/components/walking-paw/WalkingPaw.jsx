import React from 'react';
import paw from '../../assets/paw-horizontal.svg';
import './WalkingPaw.css';



export default function WalkingPaw() {
  return (

    <div className='paw-animation-container'>
        <div className="paw-container">
            <img className="paw-icon" src={paw} alt='paw'></img>
        </div>
        <div className="paw-container">
            <img className="paw-icon" src={paw} alt='paw'></img>
        </div>
        <div className="paw-container">
            <img className="paw-icon" src={paw} alt='paw'></img>
        </div>
        <div className="paw-container">
            <img className="paw-icon" src={paw} alt='paw'></img>
        </div>
        <div className="paw-container">
            <img className="paw-icon" src={paw} alt='paw'></img>
        </div>
        <div className="paw-container">
            <img className="paw-icon" src={paw} alt='paw'></img>
        </div>
    </div>

  )
}
