import { ChangeEvent, useEffect, useState } from "react"
import dataService from '../../../../services/handleRequests'

// Interfaz para el componente:
interface tableCell {
    getValue: () => '',
    row: any,
    column: any,
    table: any
}

interface dependencyInterface {
    nombre: string,
    direccion: string
}

interface directionInterface {
    direccion: string
}

const TableCell: React.FC<tableCell> = ({ getValue, row, column, table }) => {
    const initialValue = getValue()
    const tableMeta = table.options.meta
    const [value, setValue] = useState('')
    const [newValue, setNewValue] = useState<string | null>(null)
    const [dependencies, setDependencies] = useState([])
    const [directions, setDirections] = useState([])
    
    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        setNewValue(event.target.value)
        table.options.meta?.updateData(row.index, column.id, event.target.value)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewValue(event.target.value)
        table.options.meta?.updateData(row.index, column.id, event.target.value)
    }

    const getDependencies = async () => {
        const token = localStorage.getItem('jwt')
        const deps = await dataService.getDependencies(token)
        const depsValues = deps.request.map((item: dependencyInterface) => {
            return item.nombre
        })
        setDependencies(depsValues)
    }

    const getDirections = async () => {
        const token = localStorage.getItem('jwt')
        const dirs = await dataService.getDirections(token)
        const dirValues = dirs.directions.map((item: directionInterface) => {
            return item.direccion
        })
        setDirections(dirValues)
    }

    const handleDirections = (event: ChangeEvent<HTMLSelectElement>) => {
        setNewValue(event.target.value)
        table.options.meta?.updateData(row.index, column.id, event.target.value)
    }

    const userValue = ['user', 'admin', 'superAdmin']
    const generateUserValue = userValue.filter(item => item !== value)

    // Renderizando distintos inputs dependiendo de la columna y del rol del usuario:
    if (tableMeta?.newRows[row.id] && column.id === 'dependencias') {
        getDependencies()
        const generateDependencies = dependencies.filter(item => item !== value)
        return (
            // Renderizando dependencias generadas con generateDependencies():
            <select className="items-center py-0.5 pl-1 max-w-fit" onChange={handleSelect}>
                <option value="">{value}</option>
                {
                    generateDependencies.map(item => {
                        return <option key={`dependencyItem${item}`} value={`${item}`}>{item}</option>
                    })
                }
            </select>
        )
    } else if (localStorage.getItem('userRol') === 'superAdmin' && tableMeta?.newRows[row.id] && column.id === 'rol') {
        return (
            <select className="items-center py-0.5 pl-1 w-fit" onChange={handleSelect}>
                <option value={value}>{value}</option>
                {
                    generateUserValue.map(item => {
                        return <option key={`userValueItem${item}`} value={`${item}`}>{item}</option>
                    })
                }
            </select>
        )
    } else if (localStorage.getItem('userRol') === 'admin' && tableMeta?.newRows[row.id] && column.id === 'rol') {
        return (
            <span>{value}</span>
        )
    } else if (tableMeta?.newRows[row.id] && column.id === 'direcciones') {
        getDirections()
        const generateDirections = directions.filter(item => item !== value)
        return (
            <select className="items-center py-0.5 pl-1 w-fit" onChange={handleDirections}>
                <option value={value}>{value}</option>
                {
                    generateDirections.map(item => {
                        return <option key={`directionItem${item}`} value={`${item}`}>{item}</option>
                    })
                }
            </select>
        )
    } else if (tableMeta?.newRows[row.id]) {
        return (
            <input
                value={newValue ?? value}
                onChange={handleChange}
                type={column.columnDef.meta?.type || "text"}
                className='items-center py-0.5 px-1 w-[96%] max-w-36'
            />
        )
    }
    return <span>{value}</span>
}

export default TableCell