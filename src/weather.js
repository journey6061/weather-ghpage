import React from 'react';
import './weather.css'

const weather =(props)=>{
    return(
        <>
        {/* <button onClick={props.click} className='geoinfo'>
            {props.geoinfo}
        </button> */}
        <div className='weathermain'>
            {/* <span>location: {props.geoclick} - </span> */}
            <p className='location'>{props.loc}</p>
            <p className='temp'>{props.temp}&#176;</p>
            <p className='time'>{props.time}</p>
            <p className='desc'>{props.detail}</p>
        </div>
        </>
    )
}

export default weather