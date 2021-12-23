import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import ImpureClassComp from '../ImpureClassComp';
import ImpureFuncComp from '../ImpureFuncComp';
import styles from '../managers/Manager.module.css'
import PureClassComp from '../PureClassComp';
import PureFuncComp from '../PureFuncComp';
import Leader1_m1 from './leaders/Leader1_m1';
import Leader2_m1 from './leaders/Leader2_m1';

const Manager1 = () => {
    const [info, setInfo] = useState({ name: 'Vishwas' })
    return (
        <div className={styles.mydiv}>
            Manager 1
            <br />
            <span style={{ color: 'pink' }}>check console in console tab when changing value of input and also check when clicking on button.</span>
            <br />
            name: {info.name}
            <input type="text" value={info.name} onChange={($event) => setInfo({ name: $event.target.value })} />
            <button className="btn btn-primary m-2" onClick={($event) => setInfo({ name: 'Vishwas' })}>Change name to 'Vishwas' when there is already 'Vishwas' in input box</button>
            <div className="d-flex" style={{ border: '1px solid brown', padding: '5px', color: 'white', backgroundColor: 'grey' }}>
                <ImpureClassComp name={info.name} />
                <PureClassComp name={info.name} />
                <ImpureFuncComp name={info.name} />
                <PureFuncComp name={info.name} />
            </div>
            <Row>
                <Col>
                    <Leader1_m1 />
                </Col>
                <Col>
                    <Leader2_m1 />
                </Col>
            </Row>
        </div>
    )
}

export default Manager1
