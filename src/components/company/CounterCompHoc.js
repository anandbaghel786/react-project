import React, { Component } from 'react'

const counterCompHoc = (WrappedComponent, incrementCount) => {
    class CounterCompHoc extends React.Component {
        constructor(props) {
            super(props)
        
            this.state = {
                 count: 0
            }
        }

        incrementCount = () => {
            this.setState(prevState => {
                return { count: prevState.count + incrementCount }
            })
        }

        render() {
            return(
                <WrappedComponent count={this.state.count} incrementCount={this.incrementCount} {...this.props} />
            )
        }
        
    }
    return CounterCompHoc;
}

export default counterCompHoc
