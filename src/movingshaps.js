import React from 'react';
import './movingshaps.css'

const movingshapes =(props)=>{
    const round= 
    <div style={{position:'absolute', 
    animation:`turn ${props.sSpeed} cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite`,
    left:props.sLeft
    }}>
    {/* <li className={props.sLi}></li> */}
    <img style={{width:props.sWidth}} src={props.sSrc}/>
    </div>
    return(
        <>
        {round}
        </>
    )
}

export default movingshapes