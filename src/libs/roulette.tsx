import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { maskUrl } from '../utils/mask'
import { WidgetInfo, RouletteProps, ShortcutKeys } from '../utils/roulette'
import { Center } from './center'
import { innerCircle, outCircle, wheelPartCss } from './react-css/css'

const elementList = Array.from({ length: 10 }).map((e: any) => <div key={e}></div>) //init wheel parts
const widgetsMap: Map<number, WidgetInfo> = new Map() //record used widget info

export function Roulette ({ allwidget, radius = 400, shortcutKey = ShortcutKeys.ctrl }: { allwidget: [ RouletteProps ], radius?: number, shortcutKey: ShortcutKeys }) {
  const [center, setCenter]: [WidgetInfo, Dispatch<SetStateAction<WidgetInfo>>] = useState({ id: '', label: '' })
  const wheelRef: React.MutableRefObject<any> = useRef(null)

  useEffect(() => {
    maskUrl(document.getElementById('wheel-outCircle') as HTMLElement, document.getElementById('wheel-innerCircle') as HTMLElement) // make innerbox transparent
    initWheelWidget(allwidget) //set widgets to wheel
    displayWheel(wheelRef) //listen the position of mouse and move wheel to the position
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allwidget, shortcutKey])

  return <div ref={wheelRef} style={{ position: 'absolute', opacity: '0' }}>
        <div style={outCircle(radius || 400)} id="wheel-outCircle" className='roulette-out-circle'>
            <div style={innerCircle(radius || 400)} key={'-1'} id="wheel-innerCircle" className='roulette-inner-circle'>
                {PartContent()}
            </div>
            {wheelParts()}
        </div>
        <Center center={center} radius={radius || 400}/>
    </div>

  function wheelParts () {
    return elementList.map((_, i) => {
      return <div style={{ ...wheelPart(i), ...wheelPartCss(radius || 400) }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} id={`wheel-${i}`} onClick={onClick} key={i} className='roulette-wheel-part'></div>
    })
  }

  function PartContent () {
    return elementList.map((_, i) => {
      return <div style={PartContentStyle(i)} key={i}>{elementList[i] && elementList[i]}</div>
    })
  }

  function onMouseLeave (e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.currentTarget.style.opacity = '0.3'
    e.currentTarget.style.zIndex = '1'
    if (center) setCenter({ id: '', label: '', icon: '' })
  }

  function onClick (e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const targetId = e.currentTarget.id.replace('wheel-', '') //get id of wheel part
    const getWidget = document.querySelector(`[roulette-id="${widgetsMap.get(7 - Number(targetId))?.id}"]`) as HTMLDivElement
    if (!getWidget) return
    getWidget?.style.opacity !== '0' ? getWidget.style.opacity = '0' : getWidget.style.opacity = '1'
  }

  function onMouseEnter (e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.currentTarget.style.opacity = '0.6'
    e.currentTarget.style.zIndex = '9999'
    const targetId = e.currentTarget.id.replace('wheel-', '')
    if (widgetsMap.has(7 - Number(targetId))) {
      const target = widgetsMap.get(7 - Number(targetId)) as WidgetInfo
      setCenter(target)
    }
  }

  function displayWheel (wheelRef: React.MutableRefObject<any>) {
    window.addEventListener('click', locateByClick)
    window.addEventListener('keyup', hideWheel)

    function locateByClick (evt: MouseEvent) {
      if (evt.button !== 0 || !evt[shortcutKey] || wheelRef.current.style.opacity === '1') return
      evt.preventDefault()
      showWheel(evt.clientX, evt.clientY)
    }

    function showWheel (x: number, y: number) {
      wheelRef.current.parentElement.style.left = x - 200 + 'px'
      wheelRef.current.parentElement.style.top = y - 200 + 'px'
      wheelRef.current.parentElement.style.position = 'fixed'
      wheelRef.current.style.opacity = '1'
    }

    function hideWheel (evt: KeyboardEvent) {
      if (evt[shortcutKey]) return
      evt.preventDefault()
      wheelRef.current.style.opacity = '0'
    }
  }
}

function findEmpty () {
  let current = 0
  while (widgetsMap.get(current)) {
    current++
  }
  return current
}

function wheelPart (num: number): React.CSSProperties {
  return {
    transform: `rotate(${36 * num}deg) skew(54deg)`
  }
}

function PartContentStyle (num: number): React.CSSProperties { //place text content to wheel part
  return {
    position: 'absolute',
    left: Math.sin(num * 0.017453293 * 36) * 150 + 75,
    top: Math.cos(num * 0.017453293 * 36) * 150 + 75,
    width: 50,
    textAlign: 'center'
  }
}

function initWheelWidget (widgets: [ RouletteProps ]) {
  widgets.forEach(e => { //place widegts to wheel
    widgetsMap.set(e.position ? e.position < 10 ? e.position : findEmpty() : findEmpty(), {
      id: e.id,
      icon: e.icon || '',
      label: e.label
    })
  })
  elementList.forEach((e, i) => { //render widgets dom on wheel
    if (widgetsMap.get(i) && e) {
      const info = widgetsMap.get(i) as WidgetInfo
      e = <div key={i}>
                <img src={info.icon}/>
                {info.label}
            </div>
    }
  })
}
