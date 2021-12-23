import React, { useEffect, useRef } from 'react'
import ForwardRefComp from './Accessories/ForwardRefComp';

const PureFuncComp = (props) => {
    const fwdRef = useRef();

    useEffect(() => {
        fwdRef.current.focus();
        return () => {
           
        }
    }, [])
    console.log("%cPURE FUNCTIONAL COMPONENT => name: ",  'color: blue; font-weight: bold', props.name);
    return (
        <div>
            <ForwardRefComp ref={fwdRef}  />
            <span>I am PureClassComp functional component <kbd>with React.memo</kbd>, so I will not be re-render bcoz my state and props are immutable.</span>
        </div>
    )
}

export default React.memo(PureFuncComp)