import React, { Component } from 'react'

export class ImpureClassComp extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }

        this.inputRef = React.createRef();
        // this.cbRef = null;
        // this.setCbRef = element => {
        //     this.cbRef = element;
        // }
    }

    componentDidMount() {
        // !this.cbRef && this.cbRef.focus();
    }

    render() {
        console.log("%cIMPURE CLASS COMPONENT => name: ", 'color: green; font-weight: bold', this.props.name);
        return (
            <div>
                {/* <input type="text" ref={this.setCbRef} /> */}
                Usage of <kbd>Ref with React.createRef()</kbd>
                <input type="text" ref={this.inputRef} />
                <button type="button" className="btn btn-success m-2" onClick={() => this.inputRef.current.focus()}>Focus</button>
                <button type="button" className="btn btn-danger m-2" onMouseLeave={() => this.inputRef.current.blur()}>Blur</button>

                <span>I am ImpureClassComp class component extending simple <kbd>Compoenent</kbd> class, so I will be re-render bcoz my state and props are immutable.</span>

            </div>
        )
    }
}

export default ImpureClassComp
