import { useEffect, useState } from "react"

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

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    const blur = () => {
        // Acá se puede enviar la información a la tabla principal
        table.options.meta?.updateData(row.index, column.id, value)
    }

    if (tableMeta?.newRows[row.id]) {
        return column.id === 'dependencias' ? (
            <select className="items-center py-0.5 pl-1 max-w-fit" onChange={event => setValue(event.target.value)}>
                <option value="">{value}</option>
                {
                    value === 'Municipalidad norte' ?
                    (
                        <>
                            <option value="Municipalidad centro">Municipalidad centro</option>
                            <option value="Municipalidad sur">Municipalidad sur</option>
                        </>
                    ) : value === 'Municipalidad centro' ? (
                        <>
                            <option value="Municipalidad norte">Municipalidad norte</option>
                            <option value="Municipalidad sur">Municipalidad sur</option>
                        </>
                    ) : (
                        <>
                            <option value="Municipalidad norte">Municipalidad norte</option>
                            <option value="Municipalidad centro">Municipalidad centro</option>
                        </>
                    )
                }
            </select>
        ) : column.id === 'rol' ? (
            <select className="items-center py-0.5 pl-1 w-fit" onChange={event => setValue(event.target.value)}>
                <option value="">{value}</option>
                {
                    value === 'user' ?
                    (
                        <>
                            <option value="admin">admin</option>
                            <option value="superAdmin">superAdmin</option>
                        </>
                    ) : value === 'admin' ?
                    (
                        <>
                            <option value="user">user</option>
                            <option value="superAdmin">superAdmin</option>
                        </>
                    ) : (
                        <>
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                        </>
                    )
                }
            </select>
        ) : (
            <input
                value={value}
                onChange={event => setValue(event.target.value)}
                // Este onBlur es la fuente de todos los males!!!!
                onBlur={blur}
                type={column.columnDef.meta?.type || "text"}
                className='items-center py-0.5 px-1 w-[96%] max-w-36'
            />
        )
    }
    return <span>{value}</span>
    
}

export default TableCell