import { useEffect, useState } from "react"
import './tableCell.css'

interface tableCell {
    getValue: () => '',
    row: any,
    column: any,
    table: any
}

const TableCell: React.FC<tableCell> = ({ getValue, row, column, table }) => {
    const initialValue = getValue()
    // const columnMeta = column.columnDef.meta
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
                className='input-cell'
            />
        )
    }
    return <span>{value}</span>
    
}

export default TableCell