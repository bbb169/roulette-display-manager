import React from 'react'

export const L:React.CSSProperties  = {
    position: 'absolute',
    overflow: 'hidden',
    width: 400,
    height: 400,
    borderRadius: 200,
    opacity: 0
}

export const innerCircle:React.CSSProperties  = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'white',
    zIndex: 999,
    border: '2px solid rgba(0,0,0,0.4)',
    textAlign:'center'
}

export const LUlLi:React.CSSProperties  = {
    listStyle: 'none',
    position: 'absolute',
    width: 200,
    height: 200,
    right: '50%',
    top: 0,
    opacity: 0.3,
    transformOrigin: '100% 100%',
    backgroundColor: 'black',
    border: '5px solid rgba(255, 255, 255, 0.3)',
    boxSizing: 'border-box',
}