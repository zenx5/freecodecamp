import { useEffect, useState } from "react"

export default function ClockNumber({ value, max, min }:{ value:number, max?:number, min?:number }) {
    const [label, setLabel] = useState('00')
    useEffect(()=>{
        if( max && max<value ) setLabel( max.toString() )
        else if( min && min>value ) setLabel( min.toString() )
        else setLabel( value.toString() )

    },[value, min, max])

    const renderLabel = (stringLabel:string) => {
        const length = stringLabel.length
        return (
            (stringLabel[length-2] ?? "0") + (stringLabel[length-1] ?? "0")
        )
    }

    return <span>{renderLabel(label)}</span>
}