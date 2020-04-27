import React from 'react';
import './geo.css'

const geo =(props)=>{
    return(
        <>
        <button onClick={props.click} className='geoinfo'>
            {props.geoinfo}
        </button>
        </>
    )
}

export default geo