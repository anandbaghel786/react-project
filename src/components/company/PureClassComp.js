import React, { PureComponent } from 'react'

export class PureClassComp extends PureComponent {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        console.log("%cPURE CLASS COMPONENT => name: ",  'color: green; font-weight: bold', this.props.name);
        return (
            <div>
                <span>I am PureClassComp class component extending <kbd>PureClassCompoenent</kbd> class, so I will not be re-render bcoz my state and props are immutable.</span>
            </div>
        )
    }
}

export default PureClassComp
