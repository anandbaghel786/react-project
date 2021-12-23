import React, { useRef } from 'react'
import RefCompOne from './Accessories/RefCompOne';

const ImpureFuncComp = (props) => {
    const componentRef = useRef();

    const focusInput = () => {
       componentRef.current.focusInput();
    }

    const blurInput = () => {
       componentRef.current.blurInput();
    }

    console.log("%cIMPURE FUNCTIONAL COMPONENT => name: ",  'color: blue; font-weight: bold', props.name);
    return (
        <div>
            <RefCompOne ref={componentRef} />
            <button type="button" className="btn btn-success m-2" onClick={focusInput}>Focus input in RefCompOne component</button>
            <button type="button" className="btn btn-danger m-2" onClick={blurInput}>Blur from input in RefCompOne component</button>
            <span>I am ImpureFunComp functional simple component <kbd>without React.memo</kbd>, so I will be re-render bcoz my state and props are immutable.</span>
        </div>
    )
}

export default ImpureFuncComp
