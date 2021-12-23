import React from 'react'
import styles from '../../managers/Manager.module.css'
import { Col, Row } from 'react-bootstrap';
import Damini from './candidates/Damini';
import counterCompHoc from '../../CounterCompHoc';

const Leader2_m2 = ({ count, incrementCount, name }) => {
    return (
        <div className={styles.mydiv}>
            Leader2 Component [leader is {name}]
            <div style={{ border: '1px solid brown', padding: '5px' }}>
                <kbd>HOC example with common counter functionality in Leader1 and Leader2 Component</kbd>
                <button className='btn btn-success' onClick={incrementCount}>Clicked {count} times</button>
            </div>
            <Row>
                <Col>
                    <Damini />
                </Col>
            </Row>
        </div>
    )
}

export default counterCompHoc(Leader2_m2, 3)
