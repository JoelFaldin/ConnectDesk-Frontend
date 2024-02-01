import { ChangeEvent, useEffect, useState } from "react"

interface tableCell {
    getValue: () => '',
    row: any,
    column: any,
    table: any
}

const TableCell: React.FC<tableCell> = ({ getValue, row, column, table }) => {
    const initialValue = getValue()
    const tableMeta = table.options.meta
    const [value, setValue] = useState('')
    const [newValue, setNewValue] = useState<string | null>(null)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    // const blur = () => {
    //     // Acá se puede enviar la información a la tabla principal
    //     table.options.meta?.updateData(row.index, column.id, value)
    //     console.log('test', row.index, column.id, value)
    // }

    const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        setNewValue(event.target.value)
        table.options.meta?.updateData(row.index, column.id, event.target.value)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(column.id)
        setNewValue(event.target.value)
        table.options.meta?.updateData(row.index, column.id, event.target.value)
    }

    const handleAnexo = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length + 1 === 11) {
            return
        } else {
            setNewValue(event.target.value)
            table.options.meta?.updateData(row.index, column.id, event.target.value)
        }
    }

    const dependencies = ['Municipalidad norte', 'Municipalidad centro', 'Municipalidad sur']
    const generateDependencies = dependencies.filter(item => item !== value)

    const userValue = ['user', 'admin', 'superAdmin']
    const generateUserValue = userValue.filter(item => item !== value)

    if (tableMeta?.newRows[row.id]) {
        return column.id === 'dependencias' ? (
            // Renderizando dependencias generadas con generateDependencies():
            <select className="items-center py-0.5 pl-1 max-w-fit" onChange={handleSelect}>
                <option value="">{value}</option>
                {
                    generateDependencies.map(item => {
                        return <option key={`dependencyItem${item}`} value={`${item}`}>{item}</option>
                    })
                }
            </select>
        ) : column.id === 'rol' && localStorage.getItem('userRol') === 'superAdmin' ? (
            // Renderizando valores de usuario generados con generateUserValue():
            <select className="items-center py-0.5 pl-1 w-fit" onChange={handleSelect}>
                <option value={value}>{value}</option>
                {
                    generateUserValue.map(item => {
                        return <option key={`userValueItem${item}`} value={`${item}`}>{item}</option>
                    })
                }
            </select>
        ) : column.id === 'rol' && localStorage.getItem('userRol') === 'admin' ? (
            <span>{value}</span>
        ) : column.id === 'anexoMunicipal' ? (
            <>
                <input
                value={newValue ?? value}
                onChange={handleAnexo}
                type={column.columnDef.meta?.type}
                className='items-center py-0.5 px-1 w-[96%] max-w-36'
            />
            </>
        ) : (
            <input
                value={newValue ?? value}
                onChange={handleChange}
                // onBlur={blur}
                type={column.columnDef.meta?.type || "text"}
                className='items-center py-0.5 px-1 w-[96%] max-w-36'
            />
        )
    }
    return <span>{value}</span>
    
}

export default TableCell