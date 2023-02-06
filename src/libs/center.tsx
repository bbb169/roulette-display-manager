import React from 'react'
import { WidgetInfo } from '../utils/roulette'

export function Center(props:{center:WidgetInfo}) {
    const center = props.center
    return center.id
    ?
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-evenly',fontSize: 25 }} key={'-1'}>
        {center.icon&&<div style={{width:100,height:100,overflow:'hidden'}}>
            <img src={center.icon} width={100}/>
            </div>}
        <div>{center.label}</div>
    </div>
    :<></>
}