import React from 'react'

const Tortoise = ({step, stepCountFn}) => {
    return (
        <div>
            Tortoise Component
             <div style={{ border: '1px solid brown', padding: '5px' }}>
                <kbd>RenderProps Pattern</kbd>
                <button className='btn btn-success' onClick={stepCountFn}>I walked {step} steps</button>
            </div>
        </div>
    )
}

export default Tortoise
