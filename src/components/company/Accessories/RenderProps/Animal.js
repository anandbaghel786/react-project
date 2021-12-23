import React, { Component } from 'react'

class Animal extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             steps: 0
        }
    }

    stepCountFn = () => {
        this.setState(prevState => ({
            steps: prevState.steps + 1,
        }));
    }
    
    render() {
        return (
            <div>
                {this.props.render(this.state.steps, this.stepCountFn)}
                /**
                    {/* Either you can use children property of props, when passing children and working with children */}
                    {/* ie.  {this.props.children(this.state.steps, this.stepCountFn)} */}
                 */
            </div>
        )
    }
}

export default Animal
