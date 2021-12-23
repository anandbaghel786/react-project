import React, { Component } from 'react'

class ColHelp extends Component {
    constructor(props) {
        super(props)
        this.item = this.props;
        this.state = {
             
        }
    }
    
    render() {
        return (
            <React.Fragment>
                <td>{this.item.item.name}</td>
            </React.Fragment>
        )
    }
}

export default ColHelp
