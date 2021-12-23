import React from 'react'
import styles from '../../managers/Manager.module.css'
import Akbar from './candidates/Akbar'
import { Col, Row } from 'react-bootstrap';

const Leader1_m1 = () => {
    return (
        <div className={styles.mydiv}>
            Leader1
            <Row>
                <Col>
                    <Akbar />
                </Col>
            </Row>
        </div>
    )
}

export default Leader1_m1
