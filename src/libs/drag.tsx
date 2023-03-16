
import React from 'react'

export function Drag (dragDom: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) {
  let mouseX = 0
  let mouseY = 0
  let dragRef: HTMLDivElement
  console.log(dragDom)

  return <div onMouseDown={handlerClick} style={{ position: 'relative' }} ref={(el) => { dragRef = el as HTMLDivElement }}>
    {React.createElement((dragDom.children as any).type, dragDom)}
  </div>

  function handlerClick (e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation()
    let divX = 0 //original x position
    let divY = 0 //original y position
    let distanceX: number, distanceY: number //changed distance
    divX = JSON.parse(JSON.stringify(~~dragRef.style.left.replace('px', '')))
    divY = JSON.parse(JSON.stringify(~~dragRef.style.top.replace('px', '')))

    mouseX = e.clientX //x position when move start
    mouseY = e.clientY //y position when move start
    const child = (dragRef.firstElementChild as HTMLDivElement)
    const originalColor = child.style.backgroundColor

    document.onmousemove = (i) => {
      distanceX = i.clientX - mouseX
      distanceY = i.clientY - mouseY
      dragRef.style.left = divX + distanceX + 'px'
      dragRef.style.top = divY + distanceY + 'px'
      child.style.backgroundColor = 'gray'
    }
    document.onmouseup = () => {
      child.style.backgroundColor = originalColor
      document.onmousemove = null
      document.onmouseup = null
    }
  }
}
