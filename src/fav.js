import React from 'react';
import './fav.css'

const fav =(props)=>{
    return(
        <>
        <button className='favinfo' onClick={props.favback}>
            {props.lname}
            
        </button>
        </>
    )
}

export default fav