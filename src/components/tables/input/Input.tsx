import { useEffect, useState } from "react"
import './input.css'

const Input = ({
    value: starterValue,
    onChange,
    time = 500,
    ...props
  }: {
    value: string | number
    onChange: (value: string | number) => void
    time?: number
  } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
    const [value, setValue] = useState(starterValue)

    useEffect(() => {
        setValue(starterValue)
    }, [starterValue])

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, time)
        return () => clearInterval(timeout)
    }, [value])

    return (
        <>
            <input className="filter" {...props} value={value} onChange={element => setValue(element.target.value)} />
        </>
    )
}

export default Input