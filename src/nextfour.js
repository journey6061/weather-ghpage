import React from 'react';
import './nextfour.css'

const nextfour =(props)=>{
    return(
        <>
        {/* <button onClick={props.click} className='geoinfo'>
            {props.geoinfo}
        </button> */}
        <div className='weathernext'>
            {/* <span>location: {props.geoclick} - </span> */}
            <p className='temp'>{props.temp}&#176;</p>
            <p className='desc'>{props.time}</p>
            {/* <p>{props.detail}</p> */}
            <p>{props.img}</p>
        </div>
        </>
    )
}

export default nextfour