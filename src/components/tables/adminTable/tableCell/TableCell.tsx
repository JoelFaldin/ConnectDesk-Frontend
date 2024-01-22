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
        table.options.meta?.updateData(row.index, column.id, value)
    }

    if (tableMeta?.newRows[row.id]) {
        return (
            <input
                value={value}
                onChange={e => setValue(e.target.value)}
                onBlur={blur}
                type={column.columnDef.meta?.type || "text"}
                className='items-center w-10/12 py-0.5 px-0'
            />
        )
    }
    return <span>{value}</span>
    
}

export default TableCell