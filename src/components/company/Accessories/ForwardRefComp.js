import React from 'react'

const ForwardRefComp = React.forwardRef((props, ref) => {
    return (
        <div style={{backgroundColor: 'yellow', padding: '5px'}}>
                <kbd>ForwardRefComp Component</kbd>
            <input type="text" ref={ref} />
        </div>
    )
})

export default ForwardRefComp
