import React from 'react'

export const outCircle = (radius:number) :React.CSSProperties=>{
    return {
        position: 'relative',
        overflow: 'hidden',
        width: radius,
        height: radius,
        borderRadius: radius/2,
    }
}

export const innerCircle = (radius:number) :React.CSSProperties=>{
    return {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
        width: radius/2,
        height: radius/2,
        borderRadius: radius/4,
        backgroundColor: 'white',
        zIndex: 999,
        border: '2px solid rgba(0,0,0,0.4)',
        textAlign:'center'
    }
}

export const wheelPartCss = (radius:number) :React.CSSProperties=>{
    return {
        listStyle: 'none',
        position: 'absolute',
        width: radius/2,
        height: radius/2,
        right: '50%',
        top: 0,
        opacity: 0.3,
        transformOrigin: '100% 100%',
        backgroundColor: 'black',
        boxSizing: 'border-box',
    }
}