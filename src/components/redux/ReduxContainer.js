import React from 'react'
import { Provider } from 'react-redux'
import cakeStore from './cake/CakeStore'
import ReduxUI from './ReduxUI'

const ReduxContainer = () => {
    return (
        <div>
            <Provider store={cakeStore}>
                <ReduxUI />
            </Provider>
        </div>
    )
}

export default ReduxContainer
