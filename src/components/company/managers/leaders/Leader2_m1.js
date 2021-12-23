import React from 'react'
import styles from '../../managers/Manager.module.css'
import { Col, Row } from 'react-bootstrap';
import Chandra from './candidates/Chandra';
import Animal from '../../Accessories/RenderProps/Animal';
import Rabbit from '../../Accessories/RenderProps/Rabbit';
import Tortoise from '../../Accessories/RenderProps/Tortoise';

const Leader2_m1 = () => {
    return (
        <div className={styles.mydiv}>
            Leader2
            <Row>
                <Col>
                    <Chandra />
                    <Animal render={(step, stepCountFn) => <Rabbit step={step} stepCountFn={stepCountFn} />} />
                    <Animal render={(step, stepCountFn) => <Tortoise step={step} stepCountFn={stepCountFn} />} />

                    /** or you can use
                    {/* { <Animal>
                        {(step, stepCountFn) => (
                            <Tortoise step={step} stepCountFn={stepCountFn} />
                        )}
                    </Animal> } */}
                    */
                </Col>
            </Row>
        </div>
    )
}

export default Leader2_m1
