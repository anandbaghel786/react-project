import React, { Component, useState } from 'react'
import { FormLabel } from 'react-bootstrap'
import { connect, Provider } from 'react-redux'
import { buyCake, resetCakeData } from './cake/CakeAction'
import CakeContainer from './cake/CakeContainer'
import cakeStore from './cake/CakeStore'
import IcecreamContainer from './icecream/IcecreamContainer'
import icecreamStore from './icecream/IcecreamStore'

const ReduxUI = (props) => {
    const [noc, setNoc] = useState(1);
    const setCakesCount = (e) => {
       
    }

    return (
        <div>
            <div>
                <FormLabel htmlFor="Cake">How much cake you want to buy: </FormLabel>
                <input type="text" className='form-control' placeholder='How much cake you want to buy' value={noc} onChange={(e) => setNoc(e.target.value)} />
                <Provider store={cakeStore}>
                    <CakeContainer cakeCount={+noc} />
                </Provider>
                <br />
                <Provider store={icecreamStore}>
                    <IcecreamContainer />
                </Provider>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    console.log(state);
    return {
        numOfCakes: state.numOfCakes
    }
}

const mapDispatchToProps = dispach => {
    return {
        buyCake: (noc) => dispach(buyCake(noc)),
        resetCakeData: () => dispach(resetCakeData())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ReduxUI)