import React, { Component } from 'react'
import ReactDOM from 'react-dom';

class ModalPortal extends Component {

    MODAL_STYLES = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50*)',
        backgroundColor: '#FFF',
        padding: '50px',
        zIndex: 1000,
        transform: 'translate(-50%, -50%)'
    }

    OVERLAY_STYLES = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        zIndex: 1000
    }
    
    constructor(props) {
        super(props)
        // this.isOpen = props.isOpen;
        // this.closeModal = props.closeModal;
        // console.log(this.closeModal)
        this.state = {
             
        }
    }

    shouldComponentUpdate() {
        console.log(this.isOpen);
        return true;
    }
    

    clickhandler = () => {
        console.log('unknow console')
    }

    render() {
        const {isOpen, closeModal} = this.props;
        console.log('%cisOpen = ', 'color: red', isOpen)
        if(!isOpen) return null;
        return ReactDOM.createPortal(
            <>
                <div style={this.OVERLAY_STYLES} />
                <div style={this.MODAL_STYLES} >
                    Hi I am <kbd>React Portal</kbd>, and in portal you can open any <kbd>modal dialog</kbd> or <kbd>seperate window</kbd>, these type of things. <br />
                    <button type="button" className='btn btn-primary my-2' onClick={closeModal}>Close</button>
                </div>
            </>,
            document.getElementById('modal-root')
        );
    }
}

export default ModalPortal
