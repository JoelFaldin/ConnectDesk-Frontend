import { useEffect, useState } from "react"
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, getFilteredRowModel, getSortedRowModel } from '@tanstack/react-table'
import '../styles/tableStyles.css'
import dataService from "../../../services/handleRequests"
import Filter from "../filters/Filter"
import TableCell from "../adminTable/tableCell/TableCell"

// Forma de la fila:
type Employee = {
    rut: string,
    nombres: string,
    apellidos: string,
    email: string,
    rol: string,
    dependencias: string,
    direcciones: string,
    numMunicipal: string,
    anexoMunicipal: number
}

const columnhelper = createColumnHelper<Employee>() 

const columns = [
    columnhelper.group({
        id: 'Persona',
        header: () => <span>Persona</span>,
        columns: [
            columnhelper.accessor('rut', {
                header: 'Rut',
                cell: TableCell,
                meta: {
                    type: "text"
                }
            }),
            columnhelper.accessor('nombres', {
                header: 'Nombres',
                cell: TableCell,
                meta: {
                    type: 'text'
                }
            }),
            columnhelper.accessor('apellidos', {
                header: 'Apellidos',
                cell: TableCell,
                meta: {
                    type: "text"
                }
            }),
            columnhelper.accessor('email', {
                header: 'Correo',
                cell: TableCell,
                meta: {
                    type: 'text'
                }
            })
        ]
    }),
    columnhelper.group({
        id: 'Muni info',
        header: () => <span>Muni info</span>,
        columns: [
            columnhelper.accessor('rol', {
                header: 'Rol',
                cell: TableCell,
                meta: {
                    type: 'text'
                }
            }),
            columnhelper.accessor('dependencias', {
                header: 'Dependencias',
                cell: TableCell,
                meta: {
                    type: 'text'
                }
            }),
            columnhelper.accessor('direcciones',{
                header: 'Dirección',
                cell: TableCell,
                meta: {
                    type: 'text'
                }
            }),
            columnhelper.accessor('numMunicipal',{
                header: 'N° Municipal',
                cell: TableCell,
                meta: {
                    type: 'text'
                }
            }),
            columnhelper.accessor('anexoMunicipal',{
                header: 'Anexo Municipal',
                cell: TableCell,
                meta: {
                    type: 'number'
                }
            })
        ]
    }),
]

const NormalTable = () => {
    const [data, setData] = useState<Employee[]>([])

    useEffect(() => {
        dataService.getUsers()
            .then(user => {
                setData(user)
            })
    }, [])
    
    const table =  useReactTable({
        data, columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel()
    })

    return (
        <div className="table-container">
            <div className="divisor" /> 
            <table className="table">
                <thead>
                    {table.getHeaderGroups().map(group => (
                        <tr key={group.id} className="table-row">
                            {group.headers.map(header => (
                                <th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder ? null : (
                                    <>
                                        <div
                                        {...{
                                            className: header.column.getCanSort()
                                            ? 'can-filter'
                                            : '',
                                            onClick: header.column.getToggleSortingHandler(),
                                        }}
                                        >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {{
                                            asc: ' 🔼',
                                            desc: ' 🔽',
                                        }[header.column.getIsSorted() as string] ?? null}
                                        </div>
                                        {header.column.getCanFilter() ? (
                                        <div>
                                            <Filter column={header.column} table={table} />
                                        </div>
                                        ) : null}
                                    </>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="normal-row">
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className={ row._valuesCache.rol === 'admin' || row._valuesCache.rol === 'superAdmin' ? "admin-data" : "normal-data"}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="divisor" /> 
            <div className="footer">
                <button className="nav-button" onClick={() => { table.setPageIndex(0) }} disabled={!table.getCanPreviousPage()}>{'<<'}</button>
                <button className="nav-button" onClick={() => { table.previousPage() }} disabled={!table.getCanPreviousPage()}>{'<'}</button>
                <button className="nav-button" onClick={() => { table.nextPage() }} disabled={!table.getCanNextPage()}>{'>'}</button>
                <button className="nav-button" onClick={() => { table.setPageIndex(table.getPageCount() - 1) }} disabled={!table.getCanNextPage()}>{'>>'}</button>
                <span className="pagination">
                    <div>Página actual:</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </strong>
                </span>
                <span className="pagination">
                    | Ir a la página:
                    <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1} 
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            table.setPageIndex(page)
                        }}
                        className="page-input"
                    />
                </span>
                <select value={table.getState().pagination.pageSize} onChange={e => table.setPageSize(Number(e.target.value))}>
                    { [10, 20, 30, 40, 50].map(number => {
                        return <option key={number} value={number}>Mostrar {number}</option>
                    }) }
                </select>
            </div>
        </div>
    )
}

export default NormalTable