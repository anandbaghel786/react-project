import React from 'react'
import { useEffect } from 'react';
import styles from '../../../managers/Manager.module.css'

const Birbal = (props) => {
    if(props.hero=='Joker') {
        throw new Error('Not a hero');
    }
    useEffect(() => {
        return () => {
            
        }
    }, [])
    return (
        <div className={styles.mydiv}>
            <ul>
                <li>
                    {props.hero}  is a hero
                </li>
            </ul>
        </div>
    )
}

export default Birbal
