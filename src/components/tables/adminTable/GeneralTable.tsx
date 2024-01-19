import { ColumnDef, useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, flexRender, RowData, createColumnHelper, getSortedRowModel, VisibilityState } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import dataService from '../../../services/handleRequests'
import Filter from '../filters/Filter'
import '../styles/tableStyles.css'

// Celdas editables:
import TableCell from './tableCell/TableCell'
import EditCell from './adminEdit/EditCell'
import EditAdminCell from './superAdminEdit/EditAdminCell'
import React from 'react'

// Revisar esta declaración de módulo:
declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        updateData: (rowIndex: number, columnId: string, value: unknown) => void,
        newRows: any,
        setNewRows: any,
        revertData: any,
        removeRow: any
    }
}

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

// Editing data in a normal cell:
const defaultColumn: Partial<ColumnDef<Employee>> = {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
        const initialValue = getValue()
        const [value, setValue] = useState(initialValue)

        const blur = () => {
            table.options.meta?.updateData(index, id, value)
        }

        useEffect(() => {
            setValue(initialValue)
        }, [initialValue])

        return (
            <input 
                value={value as string}
                onChange={e => setValue(e.target.value)}
                onBlur={blur}
            />
        )
    }
}

const columnhelper = createColumnHelper<Employee>()

interface adminTable {
    rol: string
}

const AdminTable: React.FC<adminTable> = ({ rol }) => {
    const [data, setData] = useState<Employee[]>([])
    const [newRows, setNewRows] = useState({})
    const [cancelChange, setCancelChange] = useState<Employee[]>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({ 'edit': false })
    const rerender = () => {
        dataService.getUsers()
            .then(user => {
                setData(user)
                setCancelChange(user)
            })
    }
    
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
        columnhelper.display({
            header: 'Acciones',
            id: "edit",
            cell: rol === 'superAdmin'
                ? EditAdminCell
                : rol === 'admin' ? EditCell : ''
        }),
    ]

    useEffect(() => {
        dataService.getUsers()
            .then(user => {
                setData(user)
                setCancelChange(user)
            })
        rol !== 'user' ? setColumnVisibility({ 'edit': true }) : ''
        console.log(rol)
    }, [])

    const table = useReactTable({
        data,
        columns,
        defaultColumn,
        state: {
            columnVisibility
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        meta: {
            newRows,
            setNewRows,
            revertData: (rowIndex: number, revert: boolean) => {
                if (revert) {
                    setData((old) =>
                        old.map((row, index) =>
                            index === rowIndex ? cancelChange[rowIndex] : row
                        )
                    );
                } else {
                    setCancelChange((old) =>
                        old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))    
                    )
                }
                rerender()
            },
            updateData: async (rowIndex: number, columnId: string, value: unknown) => {
                // Revisar, funciona bien!
                dataService.updateUser(cancelChange[rowIndex].rut, columnId, value, rol)
                    .then(res => {
                        alert(res.message)
                        console.log(res)
                        rerender()
                    })
                    .catch(error => {
                        alert(error.response.data.error)
                        rerender()
                    })
            },
            removeRow: async (rowIndex: number) => {
                const decision = window.confirm('¿Quieres eliminar este usuario?')
                if (decision) {
                    await dataService.deleteUser(cancelChange[rowIndex].rut)
                    console.log('Usuario eliminado.')
                }
                const newUsers = await dataService.getUsers()
                setData(newUsers)
                rerender()
            }
        },
    })

    return (
       <div className="table-container">
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
                    {/* Aquí debe poderse renderizar dependiendo del rol del usuario */}
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="normal-row" >
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className={ row.original.rol === 'admin' || row._valuesCache.rol === 'superAdmin' ? "admin-data" : "normal-data"}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
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
                        { table.getState().pagination.pageIndex + 1 } of {' '}
                        { table.getPageCount() }
                    </strong>
                </span>
                <span className="pagination">
                    | Ir a la página:
                    <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1} 
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            table.setPageIndex(Number(page))
                        }}
                        className="page-input"
                    />
                </span>
                <select value={table.getState().pagination.pageSize} onChange={e => table.setPageSize(Number(e.target.value))}>
                    { [10, 20, 30, 40, 50].map(number => {
                        return <option key={number} value={number}>Mostrar {number}</option>
                    }) }
                </select>
                <button onClick={(() => rerender())}>Rerender</button>
            </div>
       </div> 
    )
}

export default AdminTable