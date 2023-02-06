import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { maskUrl } from '../utils/mask'
import { WidgetInfo, RouletteProps } from '../utils/roulette'
import { Center } from './center'
import { innerCircle, L, LUlLi } from './react-css/css'

const elementList= Array.from({length:10}).map((e:any)=><div key={e}></div>) //init wheel parts
let widgetsMap: Map<number, WidgetInfo> = new Map() //record used widget info

export function Roulette(props:{allwidget:[ RouletteProps ]}) {
    const [center,setCenter]:[WidgetInfo,Dispatch<SetStateAction<WidgetInfo>>] = useState({id:'',label:''})
    const wheelRef: React.MutableRefObject<any> = useRef(null)

    useEffect(()=>{ 
        maskUrl(document.getElementById("wheel-outCircle") as HTMLElement,document.getElementById("wheel-innerCircle") as HTMLElement) // make innerbox transparent
        initWheelWidget(props.allwidget)  //set widgets to wheel
        locateWheel(wheelRef) //listen the position of mouse and move wheel to the position 
    },[])

    return <div ref={wheelRef} style={{position:'absolute',opacity:'0'}}>
        <div style={L} id="wheel-outCircle">
            <div style={innerCircle} key={'-1'} id="wheel-innerCircle">
                {PartContent()}
            </div>
            {wheelParts()}
        </div>
        <Center center={center}/>
    </div>

    function wheelParts() {
        return elementList.map((_,i) => {
            return <div style={{ ...wheelPart(i), ...LUlLi }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} id={`wheel-${i}`} onClick={onClick} key={i}></div>
        })
    }

    function PartContent() {
        return elementList.map((_,i) => {
            return <div style={PartContentStyle(i)} key={i}>{elementList[i]&&elementList[i]}</div>
        })
    }

    function onMouseLeave (e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.currentTarget.style.opacity = '0.3'
        e.currentTarget.style.border = '5px solid rgba(255, 255, 255, 0.3)'
        e.currentTarget.style.zIndex='1'
        if (center) setCenter({id:'',label:'',icon:''})
    }

    function onClick(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        let targetId = e.currentTarget.id.replace('wheel-', '') //get id of wheel part
        let getWidget = document.querySelector(`[roulette-id="${widgetsMap.get(7 - Number(targetId))?.id}"]`) as HTMLDivElement
        if (!getWidget) return
        getWidget?.style.opacity!='0'?getWidget.style.opacity='0':getWidget.style.opacity='1'
    }

    function onMouseEnter(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.currentTarget.style.opacity = '0.6'
        e.currentTarget.style.border = 'none'
        e.currentTarget.style.zIndex='9999'
        let targetId = e.currentTarget.id.replace('wheel-', '')
        if (widgetsMap.has(7-Number(targetId))) {
            const target = widgetsMap.get(7-Number(targetId)) as WidgetInfo
            setCenter(target)
        }
    }
}

function findEmpty() {
    let current = 0
    while (widgetsMap.get(current)) {
        current++
    }
    return current
}

function wheelPart(num: number): React.CSSProperties {
    return {
        transform: `rotate(${36 * num}deg) skew(54deg)`,
    }
}

function PartContentStyle(num: number): React.CSSProperties { //place text content to wheel part
    return {
        position: 'absolute',
        left: Math.sin(num * 0.017453293 * 36) * 150 + 75,
        top: Math.cos(num * 0.017453293 * 36) * 150 + 75,
        width: 50,
        textAlign: 'center'
    }
}

function initWheelWidget(widgets: [ RouletteProps ]) {
    widgets.forEach(e=>{
        widgetsMap.set(e.position?e.position<10?e.position:findEmpty():findEmpty(), {
            id:e.id,
          icon: e.icon || '',
          label: e.label
        })
    })
    elementList.forEach((e, i)=>{
        if (widgetsMap.get(i)&&e) {
            const info = widgetsMap.get(i) as WidgetInfo
            e = <div key={i}>
                <img src={info.icon}/>
                {info.label}
            </div>
        }
    })
}

function locateWheel(wheelRef:React.MutableRefObject<any>) {
    let locateAllow = true
    let location = [0, 0]
    let throttle:any = null
    window.onmousemove = (e: MouseEvent) => {
        if (throttle) return
        if (locateAllow) { //DO not change position of wheel if key down
            location = [e.clientX, e.clientY]
            throttle = setTimeout(() => {
                throttle = null
            }, 100);
        }
    }
    window.addEventListener('keydown', (e) => {  //show wheel when key "ESC" down
        if (e.keyCode === 27&&locateAllow) {
            showWheel()
        }
    })
    window.addEventListener('keyup', (e) => {
        if (e.keyCode === 27) {
            wheelRef.current.style.opacity = '0'
            locateAllow = true
        }
    })

    function showWheel() {
        locateAllow = false
        wheelRef.current.parentElement.style.left = location[0] - 200 + 'px'
        wheelRef.current.parentElement.style.top = location[1] - 200 + 'px'
        wheelRef.current.parentElement.style.position = 'fixed'
        wheelRef.current.style.opacity = '1'
    }
}