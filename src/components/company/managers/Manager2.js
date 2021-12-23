import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import ModalPortal from '../Accessories/ModalPortal'
import styles from '../managers/Manager.module.css'
import Leader1_m2 from './leaders/Leader1_m2'
import Leader2_m2 from './leaders/Leader2_m2'

const Manager2 = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [mybool, setmybool] = useState(false)

    
    const toggleModal = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        console.log(isOpen);
        return () => {
            
        }
    }, [isOpen])

    return (
        <div className={styles.mydiv}>
            Manager 2
            <button type="button" className='btn btn-primary m-2' onClick={toggleModal}>Open Modal <kbd>Portal</kbd></button>
            <kbd>portal is used to render something out of react root node, but even being a child of react app</kbd>
            <ModalPortal isOpen={isOpen} closeModal={toggleModal} />
            <Row>
                <Col>
                    <Leader1_m2 name='Ram' />
                </Col>
                <Col>
                    <Leader2_m2 name='Shyam' />
                </Col>
            </Row>
        </div>
    )
}

export default Manager2
