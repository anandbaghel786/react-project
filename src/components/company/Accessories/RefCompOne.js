import React, { Component } from 'react'

class RefCompOne extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }

        this.inputRef = React.createRef();
    }

    focusInput() {
        this.inputRef.current.focus();
    }

    blurInput() {
        this.inputRef.current.blur();
    }
    
    render() {
        return (
            <div style={{backgroundColor: 'yellow', padding: '5px'}}>
                <kbd>RefCompOne Component</kbd>
                <input type="text" ref={this.inputRef} />
            </div>
        )
    }
}

export default RefCompOne
