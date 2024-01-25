import { Column, Table } from "@tanstack/react-table"
import { useEffect, useMemo, useState } from "react"
import handleFilterRequest from "../../../services/handleFilterRequest"

const Filter = ({ column, table, pageSize, page }: { column: Column<any, unknown>, table: Table<any>, pageSize: number, page: number }) => {
    const [filterValue, setFilterValue] = useState('')
    const sortedValues = useMemo(
        () => 
        Array.from(column.getFacetedUniqueValues().keys()).sort(),
            [column.getFacetedUniqueValues()]
    )

    // const meta = table.options.meta

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         handleFilterRequest.searchFilter(column.id, filterValue, pageSize, page)
    //             .then(res => {
    //                 console.log(res)
    //             })
    //     }, 0)
    //     return () => clearInterval(timeout)
    // }, [filterValue])

    return(
        <>
             <datalist id={column.id + 'list'}>
                { sortedValues.slice(0, 1000).map((val: any) => (
                    <option value={val} key={val} />
                ))}
            </datalist>
            <input 
                type="text"
                value={ (filterValue ?? '') as string }
                onChange={ element => setFilterValue(element.target.value)}
                placeholder="Buscar..."
                className="w-28 p-1 rounded my-2"
            />
         </>
    )
}

export default Filter