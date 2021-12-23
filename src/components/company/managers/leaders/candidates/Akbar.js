import React, { useState } from 'react'
import { Row } from 'react-bootstrap'
import { AdminConsumer } from '../../../Accessories/Context/AdminContext'
import { UserConsumer } from '../../../Accessories/Context/UserContext'
import styles from '../../../managers/Manager.module.css'
import ColHelp from './AkbarAccessories/ColHelp'

const initFruits = [
    { id: 1, name: 'grapes' },
    { id: 2, name: 'banana' },
    { id: 3, name: 'orange' },
]

const Akbar = () => {
    const [fruits, setfruits] = useState(initFruits)
    return (
        <UserConsumer>
            {
                (userValue) => {
                    return (
                    <AdminConsumer>
                        {
                            (adminValue) => {
                                return <>
                                    I am userValue as <kbd>{userValue}</kbd> and being consumed by Akbar component using UserConsumer
                                    <div className={styles.mydiv}>
                                        <br />
                                        I am userValue as <kbd>{adminValue}</kbd> and being consumed by Akbar component using AdminConsumer
                                        Akbar works! <br />
                                        -----------------
                                        <br />
                                        <b style={{ color: '#cfc2c2' }}>This fruit table, each row is using <kbd>React.Fragment</kbd> by child component to prevent unnecessary render of exra div</b>
                                        <table>
                                            <tbody>
                                                {
                                                    fruits.map(item => {
                                                        return (
                                                            <tr key={item.id}>
                                                                <ColHelp item={item} />
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        <hr />
                                    </div>
                                </>
                            }
                        }
                    </AdminConsumer>
                    )
                }
            }
        </UserConsumer>
    )
}

export default Akbar
