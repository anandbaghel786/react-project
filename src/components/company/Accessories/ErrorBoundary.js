import React, { Component } from 'react'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        }
    }

    render() {
        if (this.state.hasError) {
            console.log(this.props);
            return (
                <>
                    <div style={{color: 'red'}}>
                        Something went wrong! {this.props.children.props.hero} is not a hero
                    </div>
                    <br />
                    This message is due to <kbd>ErrorBoundary</kbd> concept, because <span style={{color: 'red'}}>{this.props.children.props.hero}</span> is set as hero, but not hero and so error thrown
                </>
            )

        }
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default ErrorBoundary
