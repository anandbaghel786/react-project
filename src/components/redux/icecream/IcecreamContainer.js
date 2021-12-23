import React from 'react'
import { connect } from 'react-redux'
import buyIcecream from './IcecreamAction'

const IcecreamContainer = (props) => {
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <h3>Number of icecreams: {props.numOfIcecreams}</h3>
            <button className='btn btn-primary ml-2' onClick={props.buyIcecream}>Buy Icecream</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        numOfIcecreams: state.numOfIcecreams
    }
}

const mapDispatchToProps = dispach => {
    return {
        buyIcecream: () => dispach(buyIcecream())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(IcecreamContainer)
