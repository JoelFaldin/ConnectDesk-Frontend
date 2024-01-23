import { ColumnDef, useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, flexRender, RowData, createColumnHelper, getSortedRowModel, VisibilityState } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import dataService from '../../../services/handleRequests'
import Filter from '../filters/Filter'
import '../styles/tableStyles.css'
import handleFilterRequest from '../../../services/handleFilterRequest'

// Celdas editables:
import TableCell from './tableCell/TableCell'
import EditCell from './adminEdit/EditCell'
import EditAdminCell from './superAdminEdit/EditAdminCell'

// Iconos:
import { BiSolidChevronsLeft } from "react-icons/bi"
import { BiSolidChevronLeft } from "react-icons/bi"
import { BiSolidChevronRight } from "react-icons/bi"
import { BiSolidChevronsRight } from "react-icons/bi"


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

const GeneralTable: React.FC<adminTable> = ({ rol }) => {
    const [data, setData] = useState<Employee[]>([])
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [newRows, setNewRows] = useState({})
    const [cancelChange, setCancelChange] = useState<Employee[]>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({ 'edit': false })

    // Estado para decidir el orden de los filtros:
    const [filterOrder, setFilterOrder] = useState('')
    
    const rerender = () => {
        dataService.getUsers(pageSize, page)
            .then(data => {
                setData(data.firstN)
                setCancelChange(data.firstN)
            })
    }

    useEffect(() => {
        dataService.getUsers(page, pageSize)
            .then(data => {
                setData(data.firstN)
                setCancelChange(data.firstN)
                setTotal(data.totalData)
            })
        rol !== 'user' ? setColumnVisibility({ 'edit': true }) : ''
    }, [])
    
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
                rerender()
            }
        },  
    })

    useEffect(() => {
        rerender()
    }, [pageSize, page])

    const handleFilter = (column: string) => {
        if (filterOrder === 'asc') {
            handleFilterRequest.toggleFilter(column, 'desc')
                .then(filtered => {
                    console.log(filtered)
                })
            // console.log('hey')
            setFilterOrder('desc')
        } else if (filterOrder === 'desc') {
            handleFilterRequest.toggleFilter(column, 'normal')
                .then(filtered => {
                    console.log(filtered)
                })
            // console.log('normal')
            setFilterOrder('normal')
        } else if (filterOrder === 'normal') {
            handleFilterRequest.toggleFilter(column, 'asc')
                .then(filtered => {
                    console.log(filtered)
                })
            // console.log('asc')
            setFilterOrder('asc')
        }
        // console.log(column)
    }

    return (
       <div className="p-2 ">
            <table className="border-solid border-1 border-gray-100 block w-fit border-collapse my-6 mx-auto text-base shadow-md table">
                <thead>
                    {table.getHeaderGroups().map(group => (
                        <tr key={group.id}>
                            {group.headers.map(header => (
                                <th key={header.id} colSpan={header.colSpan} className="bg-zinc-200 border-2 border-solid border-gray-300 py-0.5 px-1 w-fit min-w-32">
                                    {header.isPlaceholder ? null : (
                                    <>
                                        <div 
                                        {...{
                                            className: 'cursor-pointer'
                                            // onClick: header.column.getToggleSortingHandler(),
                                        }}
                                        onClick={() => handleFilter(header.id)}
                                        >
                                        {/* className='cursor-pointer' */}
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
                <tbody className="border-b border-solid border-gray-100">
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="border-b border-solid border-gray-300" >
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className={ row.original.rol === 'admin' || row._valuesCache.rol === 'superAdmin'
                                    ? "text-left py-2 px-2.5 border-r border-solid border-gray-300 bg-cyan-50 w-fit max-h-2"
                                    : "text-left py-2 px-2.5 border-r border-solid border-gray-300 w-fit max-h-2"}>
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
            <div className="h-4" /> 
            <div className="flex justify-center items-center gap-2">
                <div className="flex">
                    <a className="cursor-pointer py-0 px-2" onClick={() => setPage(1)}>
                        <BiSolidChevronsLeft size={24} />
                    </a>
                    <a className="cursor-pointer py-0 px-2" onClick={() => setPage(page - 1 < 1 ? 1 : page - 1)}>
                        <BiSolidChevronLeft size={24} />
                    </a>
                    <a className="cursor-pointer py-0 px-2" onClick={() => setPage(page + 1)}>
                        <BiSolidChevronRight size={24} />
                    </a>
                    <a className="cursor-pointer py-0 px-2" onClick={() => setPage(Math.floor(total / pageSize) + 1)}>
                        <BiSolidChevronsRight size={24} />
                    </a>
                </div>
                <span className="flex items-center gap-2">
                    <div>Página actual:</div>
                    <strong>
                        { page } de {' '}
                        { Math.floor(total / pageSize) + 1 }
                    </strong>
                </span>
                <span className="flex items-center gap-2">
                    | Ir a la página:
                    <input
                        type="text"
                        value={page}
                        onChange={event => {
                            const fakeNumber = Number(event.target.value)
                            if (!Number.isNaN(fakeNumber)) {
                                setPage(Number(event.target.value))
                            }
                        }}
                        className="p-0.5 rounded w-8"
                    />
                </span>
                <select value={table.getState().pagination.pageSize} onChange={e => {
                    setPageSize(Number(e.target.value))
                    table.setPageSize(Number(e.target.value))
                    }}
                    className="p-0.5 rounded w-32"
                    >
                    { [10, 20, 30, 40, 50].map(number => {
                        return <option key={number} value={number}>Mostrar {number}</option>
                    }) }
                </select>
            </div>
       </div> 
    )
}

export default GeneralTable