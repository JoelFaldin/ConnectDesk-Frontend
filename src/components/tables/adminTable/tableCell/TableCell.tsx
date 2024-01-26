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
    
    // console.log(column.id)

    if (tableMeta?.newRows[row.id]) {
        return column.id !== 'rol' ? (
            <input
                value={value}
                onChange={event => setValue(event.target.value)}
                // Este onBlur es la fuente de todos los males!!!!
                onBlur={blur}
                type={column.columnDef.meta?.type || "text"}
                className='items-center py-0.5 px-1 w-[96%] max-w-36'
            />
        ) : (
            <select className="items-center py-0.5 pl-3 w-full" onChange={event => setValue(event.target.value)}>
                <option value="user">user</option>
                <option value="admin">admin</option>
                <option value="superAdmin">superAdmin</option>
            </select>
        )
    }
    return <span>{value}</span>
    
}

export default TableCell