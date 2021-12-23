import React from 'react'

const Rabbit = ({step, stepCountFn}) => {
    return (
        <div>
            Rabbit Component
             <div style={{ border: '1px solid brown', padding: '5px' }}>
                <kbd>RenderProps Pattern</kbd>
                <button className='btn btn-success' onMouseOver={stepCountFn}>I walked {step} steps</button>
            </div>
        </div>
    )
}

export default Rabbit
