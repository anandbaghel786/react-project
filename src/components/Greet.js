import React, { useState } from 'react';
import { filter } from 'rxjs/operators';
import Salelpartners from './a';
import SalesChannels from './b';
import { PageFlip } from 'page-flip';
import './Greet.css';
// function Greet() {
//     return <h1>Hello Anand</h1>
// }

export const Greet = (props) => {
    console.log(SalesChannels.salespartners);
    let [bool, setBool] = useState(props.bool);
    let output = [];
    const clickHandle = (e) => {
        setBool(!bool)
    }

    function onChangeHanlder(e) {
        console.log(e)
    }

    function filter(e) {
        output = []
        let SalesChannelIds = (e.target.value.split(", ")).map(ele => +ele);
        console.log(SalesChannelIds);
        SalesChannels.salespartners.forEach(ele => {
            if (ele.SalesChannel && ele.SalesChannel.length > 0) {
                for (let i = 0; i < SalesChannelIds.length; i++) {
                    let count = 0;
                    if (ele.SalesChannel.includes(+SalesChannelIds[i])) {
                        count++;
                    }
                    if (count > 0) {
                        output.push(ele);
                        break;
                    }
                }
            }
        });

        console.log(output);
    }
    return <>
        <input type="text" value="103200, 215402" onChange={(e) => onChangeHanlder(e)} onBlur={(e) => filter(e)} />
        <button type="button" style={{ background: bool ? 'red' : '#1f655b' }} className="btn btn-primary ml-2" value="hello!" onClick={(e) => clickHandle(e)}> {bool ? 'Change to Green' : 'Change to red'}</button>
    </>

}

// export default Greet;