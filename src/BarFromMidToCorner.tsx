import React from 'react'
import {useStyle} from './hooks'

interface BFMTCProps {
    w : number, 
    h : number, 
    scale : number, 
    onClick : Function, 
}

const BarFromMidToCorner = (props : BFMTCProps) => {
    const {barStyle} = useStyle(props.w, props.h, props.scale)
    return (
        <React.Fragment>
            {[0, 1].map(i => (<div style = {barStyle(i)} onClick = {() => props.onClick()}></div>))}
        </React.Fragment>
    )
}