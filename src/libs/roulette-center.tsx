import React from 'react'
import { WidgetInfo } from '../utils/roulette'

export function Center (props: { center: WidgetInfo, radius: number }) {
  const center = props.center
  return center.id
    ? <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', fontSize: 24 * props.radius / 400 }} key={'-1'}>
        {center.icon && <div style={{ width: props.radius / 4, height: props.radius / 4, overflow: 'hidden' }}>
            <img src={center.icon} width={props.radius / 4}/>
            </div>}
        <div>{center.label}</div>
    </div>
    : <></>
}
