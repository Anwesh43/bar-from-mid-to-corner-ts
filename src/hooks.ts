import {useState, useEffect} from 'react'

const scGap : number = 0.01 
const delay : number = 20 

export const useAnimatedScale = () => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            return 0 
                        }
                        return prev + scGap  
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {
            window.onresize = () => {

            }
        }
    })
    return {
        w, 
        h
    }
}

const sinify = (scale : number) => Math.sin(scale * Math.PI)

export const useStyle = (w : number, h : number, scale : number) => {
    const background = 'indigo'
    const size = Math.min(w, h) / 10 
    const hSize = size / 3 
    const sf : number = sinify(scale)
    const position = 'absolute'
    return {
        barStyle(i : number) {
            const sk : number = 1 - 2 * i
            const left = `${(w / 2 - size / 2) * (1 + sk * sf)}px`
            const top = `${(h / 2 - hSize / 2) * (1 + sf)}px`
            const width = `${size}px`
            const height = `${hSize}px`
            return {
                position,
                width, 
                height, 
                left, 
                top,
                background 
            }
        }
    }
}