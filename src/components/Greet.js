import React, { useState } from 'react';

// function Greet() {
//     return <h1>Hello Anand</h1>
// }

export const Greet = (props) => {
    // const { isAdmin } = props;
    // let bool = props.bool;
    let [bool, setBool] = useState(props.bool);
    const clickHandle = (e) => {
        setBool(!bool)
    }
    // console.log(props);
    return <>
        <button type="button" style={{ background: bool ? 'red' : '#1f655b' }} className="btn btn-primary ml-2" value="hello!" onClick={(e) => clickHandle(e)}> {bool ? 'Change to Green' : 'Change to red'}</button>
    </>

}

// export default Greet;