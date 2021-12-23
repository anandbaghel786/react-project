import React, { useState } from 'react'
import styles from '../../managers/Manager.module.css'
import { Col, Row } from 'react-bootstrap';
import Birbal from './candidates/Birbal';
import ErrorBoundary from '../../Accessories/ErrorBoundary';
import counterCompHoc from '../../CounterCompHoc';

const heroList = ['Hanuman', 'Superman', 'Joker']

const Leader1_m2 = ({ count, incrementCount, name }) => {
    const [heros, setHeros] = useState(heroList)
    console.log(name);
    console.log(count);
    return (
        <div className={styles.mydiv}>
            Leader1 Component [leader is {name}]
            <div style={{border: '1px solid brown', padding: '5px' }}>
                <kbd>HOC example with common counter functionality in Leader1 and Leader2 Component</kbd>
                <button className='btn btn-success' onMouseOver={incrementCount}>Hovered {count} times</button>
            </div>
            <br />Inside Birbal Component:
            <Row>
                <Col>
                    {
                        heros.map((item, index) => {
                            return (
                                <div key={item} >
                                    <ErrorBoundary>
                                        <Birbal hero={item} >
                                            Hello heroes
                                        </Birbal>
                                    </ErrorBoundary>
                                </div>
                            )
                        })
                    }
                </Col>
            </Row>
        </div>
    )
}

export default counterCompHoc(Leader1_m2, 2)
