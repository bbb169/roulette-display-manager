import React, { useEffect, useRef, useState } from 'react'
import { WidgetInfo, RouletteProps } from '../utils/roulette'
import { innerCircle, L, LUlLi } from './react-css/css'

const list: number[] = []
const elementList: JSX.Element[] = []
let widgetsMap: Map<number, WidgetInfo> = new Map()
for (let index = 0; index < 10; index++) {
    list.push(index)
    elementList.push(<div key={index}></div>)
}

export function Roulette(props:{allwidget:[ RouletteProps ]}) {
    const [centerText,setCenterText]:[string,any] = useState('')
    const wheelRef: React.MutableRefObject<any> = useRef(null)

    useEffect(()=>{ //set widget to wheel
        const widgets = props.allwidget
        widgets.forEach(e=>{
            widgetsMap.set(e.position?e.position<10?e.position:findEmpty():findEmpty(), {
                id:e.id,
              icon: e.icon || '',
              label: e.label
            })
        })
        elementList.forEach((e, i)=>{
            if (widgetsMap.get(i)) {
                const info = widgetsMap.get(i) as WidgetInfo
                e = <div key={i}>
                    <img src={info.icon}/>
                    {info.label}
                </div>
            }
            e
        })
    },[])

    useEffect(() => { //show wheel when key "ESC" down
        let locateAllow = false
        let keyDown = false
        let location: [number, number]
        let reduce = false
        window.onmousemove = (e: MouseEvent) => {
            if (!reduce) {
                reduce = true
                location = [e.clientX, e.clientY]
                setTimeout(() => {
                    reduce = false
                }, 200);
            }
            if (locateAllow) {
                locateAllow = false
                wheelRef.current.parentElement.style.left = location[0] - 200 + 'px'
                wheelRef.current.parentElement.style.top = location[1] - 200 + 'px'
                wheelRef.current.parentElement.style.position = 'fixed'
                wheelRef.current.style.opacity = '1'
            }
        }
        window.addEventListener('keydown', (e) => {
            if (e.keyCode === 27) {
                if (!keyDown) {
                    locateAllow = true
                    keyDown = true
                }
            }
        })
        window.addEventListener('keyup', (e) => {
            if (e.keyCode === 27) {
                wheelRef.current.style.opacity = '0'
                keyDown = false
            }
        })
    }, [])


    // const onMouseEnter: React.MouseEventHandler<HTMLDivElement> = (e) => { //hightlight wheel part when mouse enter
    //     e.currentTarget.style.opacity = '0.6'
    //     e.currentTarget.style.border = 'none'
    //     e.currentTarget.style.zIndex='9999'
    //     let targetId = e.currentTarget.id.replace('wheel-', '')
    //     console.log(7-Number(targetId))
    //     if (widgetsMap.has(7-Number(targetId))) {
    //         setCenterText(widgetsMap.get(7-Number(targetId))?.label)
    //     }
    // }

    // const onMouseLeave: React.MouseEventHandler<HTMLDivElement> = (e) => { //make wheel part back to normal
    //     e.currentTarget.style.opacity = '0.3'
    //     e.currentTarget.style.border = '5px solid rgba(255, 255, 255, 0.3)'
    //     e.currentTarget.style.zIndex='1'
    //     if (centerText) {
    //         setCenterText('')
    //     }
        
    // }

    // const onClick :React.MouseEventHandler<HTMLDivElement> =(e)=>{
    //     let targetId = e.currentTarget.id.replace('wheel-', '') //get id of wheel part
    //     let getWidget = document.querySelector(`[roulette-id="${widgetsMap.get(7 - Number(targetId))?.id}"]`) as HTMLDivElement
    //     if (!getWidget) return
    //     getWidget?.style.opacity!='0'?getWidget.style.opacity='0':getWidget.style.opacity='1'
    // }

    return <div style={L} ref={wheelRef}>
        <div style={innerCircle} key={'-1'}>
            {PartContent()}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 25 }} key={'-1'}>{centerText}</div>
        </div>
        {wheelParts()}
    </div>

    function wheelParts() {
        return list.map(e => {
            return <div style={{ ...wheelPart(e), ...LUlLi }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} id={`wheel-${e}`} onClick={onClick} key={e}></div>
        })
    }

    function PartContent() {
        return list.map(e => {
            return <div style={PartContentStyle(e)} key={e}>{elementList[e]&&elementList[e]}</div>
        })
    }

    function onMouseLeave (e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.currentTarget.style.opacity = '0.3'
        e.currentTarget.style.border = '5px solid rgba(255, 255, 255, 0.3)'
        e.currentTarget.style.zIndex='1'
        if (centerText) {
            setCenterText('')
        }
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
        console.log(7-Number(targetId))
        if (widgetsMap.has(7-Number(targetId))) {
            setCenterText(widgetsMap.get(7-Number(targetId))?.label)
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