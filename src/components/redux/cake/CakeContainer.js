import React, { useEffect } from 'react'
import { useState } from 'react';
import { connect, useSelector } from 'react-redux'
import {buyCake, resetCakeData} from './CakeAction'

const CakeContainer = (props) => {
    console.log(props);
    const numOfCakes = useSelector(state => props.numOfCakes ? props.numOfCakes : state.numOfCakes)
    console.log(numOfCakes);

    const checkStatus = () => {
        if(numOfCakes>0) {
            console.log(numOfCakes);
            props.buyCake(props.cakeCount);
            
        } else {
            alert("No cake available in stock, contact to dealer")
        }
    }
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <h3>Number of cakesk: {props.numOfCakes}</h3>
            <button className='btn btn-primary ml-2' onClick={checkStatus}>Buy Cake</button>
            <button className='btn btn-primary ml-2' onClick={props.resetCakeData}>Reset Cake Count</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        numOfCakes: state.numOfCakes
    }
}

const mapDispatchToProps = dispach => {
    return {
        buyCake: (numOfCakes) => dispach(buyCake(numOfCakes)),
        resetCakeData: () => dispach(resetCakeData())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CakeContainer)
