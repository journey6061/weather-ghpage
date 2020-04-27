import React from 'react';
import './weather.css'

const weather =(props)=>{
    return(
        <>
        {/* <button onClick={props.click} className='geoinfo'>
            {props.geoinfo}
        </button> */}
        <div className=''>
            <span>temperature: {props.temp}</span>
            <span>time: {props.name}</span>
            <span>detail: {props.detail}</span>
        </div>
        </>
    )
}

export default weather