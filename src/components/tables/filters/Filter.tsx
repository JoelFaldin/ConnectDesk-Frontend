import { Column, Table } from "@tanstack/react-table";
import { useMemo } from "react";
import Input from "../input/Input";

const Filter = ({ column }: { column: Column<any, unknown>, table: Table<any> }) => {
    const filterValue = column.getFilterValue()
    const sortedValues = useMemo(
        () => 
        Array.from(column.getFacetedUniqueValues().keys()).sort(),
            [column.getFacetedUniqueValues()]
    )

    return(
        <>
             <datalist id={column.id + 'list'}>
                { sortedValues.slice(0, 1000).map((val: any) => (
                    <option value={val} key={val} />
                ))}
            </datalist>
            <Input 
                type="text"
                value={ (filterValue ?? '') as string }
                onChange={ value => {column.setFilterValue(value)} }
                placeholder="Buscar..."
                className="w-28 p-1 rounded my-2"
                list={ column.id + 'list' }
            />
         </>
    )
}

export default Filter