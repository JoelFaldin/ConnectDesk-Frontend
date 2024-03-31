// Importando componentes y módulos:
import { ColumnDef, useReactTable, getCoreRowModel, flexRender, RowData, createColumnHelper, VisibilityState } from '@tanstack/react-table'
import CreateDependency from '../../highAdmin/handleDepartments/createDepartment'
import CreateDirection from '../../highAdmin/createDirection/createDirection'
import ExcelComponent from '../../highAdmin/HandleExcel/ExcelComponent'
import handleFilterRequest from '../../../services/handleFilterRequest'
import CreateUser from '../../highAdmin/handleUser/createUser'
import dataService from '../../../services/handleRequests'
import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Message } from "../message/Message"

// Editable cells:
import EditAdminCell from './superAdminEdit/EditAdminCell'
import TableCell from './tableCell/TableCell'
import EditCell from './adminEdit/EditCell'

// Icons:
import { BiSolidChevronsRight } from "react-icons/bi"
import { BiSolidChevronRight } from "react-icons/bi"
import { BiSolidChevronsLeft } from "react-icons/bi"
import { BiSolidChevronLeft } from "react-icons/bi"
import { RiFileExcel2Fill } from "react-icons/ri";
import { BiSolidUserPlus } from "react-icons/bi"
import { BiImageAdd } from "react-icons/bi"
import { BiLogOut } from "react-icons/bi";

// Module declaration for the component:
declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        updateData: (rowIndex: number, columnId: string, value: unknown) => void,
        uploadData: any,
        newRows: any,
        setNewRows: any,
        revertData: any,
        removeRow: any,
        makeAdmin: any
    }
}

// File's shape:
type Employee = {
    identifier: string,
    names: string,
    lastNames: string,
    email: string,
    role: string,
    departments: string,
    directions: string,
    jobNumber: string,
    contactNumber: number
}

// Editing info in a
const defaultColumn: Partial<ColumnDef<Employee>> = {
    cell: ({ getValue }) => {
        const initialValue = getValue()
        const [value, setValue] = useState(initialValue)

        return (
            <input 
                value={value as string}
                onChange={e => setValue(e.target.value)}
            />
        )
    }
}

const columnhelper = createColumnHelper<Employee>()

// Interfaces:
interface adminTable {
    rol: string
}

interface arrayInterface {
    rowIndex: number,
    columnId: string,
    value: unknown
}

// Principal Component:
const GeneralTable: React.FC<adminTable> = ({ rol }) => {
    // Table info:
    const [data, setData] = useState<Employee[]>([])
    const [cancelChange, setCancelChange] = useState<Employee[]>([])
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [dependencies, setDependencies] = useState([])
    const [directions, setDirections] = useState([])

    // Table's functionality:
    const [newRows, setNewRows] = useState({})
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({ 'edit': false, 'rut': false, 'rol': false })

    // Values for the filters:
    const [searchValue, setSearchValue] = useState('')
    const [searchColumn, setSearchColumn] = useState('')
    const [filterColumn, setFilterColumn] = useState('')
    const [filterOrder, setFilterOrder] = useState('normal')
    const [showMessage, setShowMessage] = useState(false)
    
    // State to temporarily store edited data:
    const [tempData, setTempData] = useState<arrayInterface[]>([])

    // States to hide or show button components:
    const [excelComp, setExcelComp] = useState(false)
    const [depComp, setDepComp] = useState(false)
    const [dirComp, setDirComp] = useState(false)
    const [newUserComp, setNewUserComp] = useState(false)

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    // Function to rerender the table. It is used when the page is changed:
    const rerender = async () => {
        const token = localStorage.getItem('jwt')
        if (filterColumn !== '') {   
            try {
                const users = await dataService.getFilteredUsers(filterColumn, filterOrder, pageSize, page, token)
                setData(users.content)
                setCancelChange(users.content)
                setTotal(users.totalData)
            } catch(error: any) {
                alert(error.response.data.error)
            }
        } else {
            try {
                const users = await dataService.getUsers(searchValue, searchColumn, pageSize, page, token)
                setData(users.content)
                setCancelChange(users.content)
                setTotal(users.totalData)
            } catch(error: any) {
                alert(error.response.data.error)
            }
        }
    }

    // Initial function that brings data from the server to the table and brings existing dependencies and directions:
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('jwt')
                const data = await dataService.getUsers(searchValue, searchColumn, pageSize, page, token)
                setData(data.content)
                setCancelChange(data.content)
                setTotal(data.totalData)
                rol !== 'user' ? setColumnVisibility({ 'edit': true }) : ''
            } catch(error: any) {
                console.error(error.response.data.error)
            }
        }
        fetchData()

        const fetchDeps = async () => {
            const token = localStorage.getItem('jwt')
            const deps = await dataService.getDependencies(token)
            setDependencies(deps.request)
        }
        fetchDeps()

        const fetchDirs = async () => {
            const token = localStorage.getItem('jwt')
            const dirs = await dataService.getDirections(token)
            setDirections(dirs.directions)
        }
        fetchDirs()
    }, [])

    // Column definition:
    const columns = [
        columnhelper.group({
            id: 'Person',
            header: () => <span>Person</span>,
            columns: [
                columnhelper.accessor('identifier', {
                    header: 'Identifier',
                    id: 'identifier',
                    cell: TableCell,
                    meta: {
                        type: "text"
                    }
                }),
                columnhelper.accessor('names', {
                    header: 'Names',
                    cell: TableCell,
                    meta: {
                        type: 'text'
                    }
                }),
                columnhelper.accessor('lastNames', {
                    header: 'Lastnames',
                    cell: TableCell,
                    meta: {
                        type: "text"
                    }
                }),
                columnhelper.accessor('email', {
                    header: 'Email',
                    cell: TableCell,
                    meta: {
                        type: 'text'
                    }
                })
            ]
        }),
        columnhelper.group({
            id: "Company's information",
            header: () => <span>Company's Information</span>,
            columns: [
                columnhelper.accessor('role', {
                    header: 'Role',
                    id: 'role',
                    cell: TableCell,
                    meta: {
                        type: 'text'
                    }
                }),
                columnhelper.accessor('departments', {
                    header: 'departments',
                    cell: TableCell,
                    meta: {
                        type: 'text'
                    }
                }),
                columnhelper.accessor('directions',{
                    header: 'Direction',
                    cell: TableCell,
                    meta: {
                        type: 'text'
                    }
                }),
                columnhelper.accessor('jobNumber',{
                    header: 'Job Number',
                    cell: TableCell,
                    meta: {
                        type: 'text'
                    }
                }),
                columnhelper.accessor('contactNumber',{
                    header: 'Contact Number',
                    cell: TableCell,
                    meta: {
                        type: 'number'
                    }
                })
            ]
        }),
        columnhelper.display({
            header: 'Actions',
            id: "edit",
            cell: rol === 'superAdmin'
                ? EditAdminCell
                : rol === 'admin' ? EditCell : ''
        }),
    ]

    // Table definition:
    const table = useReactTable({
        data,
        columns,
        defaultColumn,
        state: {
            columnVisibility
        },
        getCoreRowModel: getCoreRowModel(),
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
            updateData: (rowIndex: number, columnId: string, value: unknown) => {
                const newData: arrayInterface = {
                    rowIndex,
                    columnId,
                    value
                }
                
                setTempData(prev => [
                    ...prev,
                    newData
                ])
            },
            uploadData: async () => {
                if (confirm('Do you want to update this user?')) {
                    const jwtToken = localStorage.getItem('jwt')

                    const filteredData = Object.values(
                        tempData.reduce((acc: any, item: any) => {
                          const key = `${item.rowIndex}_${item.columnId}`
                          acc[key] = item
                          return acc
                        }, {})
                      )
                      setTempData([])
                    try {
                        await dataService.updateUser(filteredData, pageSize, page, jwtToken)
                        rerender()
                    } catch(error: any) {
                        alert(error.response.data.error)
                    }
                }
            },
            removeRow: async (rowIndex: number) => {
                const decision = window.confirm('Do you want to remove this user?')
                if (decision) {
                    try {
                        const token = localStorage.getItem('jwt')
                        await dataService.deleteUser(cancelChange[rowIndex].identifier, token)
                    } catch(error: any) {
                        alert(error.response.data.error)
                    }
                }
                rerender()
            },
            makeAdmin: async (rowIndex: number) => {
                const decision = window.confirm(cancelChange[rowIndex].role === 'user' ? `Do you want this user to become an admin?` : `Do you want this user to stop being an admin?`)
                if (decision) {
                    try {
                        const token = localStorage.getItem('jwt')
                        await dataService.makeAdmin(cancelChange[rowIndex].identifier, token)
                    } catch(error: any) {
                        alert(error.response.data.error)
                    }
                    rerender()
                }
            }
        }
    })

    // Function to rerender dependencies:
    const rerenderDependency = async () => {
        try {
            const token = localStorage.getItem('jwt')
            const rerender = await dataService.getDependencies(token)
            setDependencies(rerender.request)
        } catch(error: any) {
            alert(error.response.data.error)
        }
    }

    // Function to rerender directions:
    const rerenderDirection = async () => {
        try {
            const token = localStorage.getItem('jwt')
            const rerender = await dataService.getDirections(token)
            setDirections(rerender.directions)
        } catch(error: any) {
            alert(error.response.data.error)
        }
    }

    // Updating a column's order in a table:
    const handleFilter = (column: string) => {
        setFilterColumn(column)
        const token = localStorage.getItem('jwt')
        if (filterOrder === 'asc') {
            handleFilterRequest.toggleFilter(column, 'desc', searchValue, searchColumn, pageSize, page, token)
                .then(res => {
                    setData(res.content)
                    setCancelChange(res.content)
                })
            setFilterOrder('desc')
        } else if (filterOrder === 'desc') {
            handleFilterRequest.toggleFilter(column, 'normal', searchValue, searchColumn, pageSize, page, token)
                .then(res => {
                    setData(res.content)
                    setCancelChange(res.content)
                })
            setFilterOrder('normal')
        } else if (filterOrder === 'normal') {
            handleFilterRequest.toggleFilter(column, 'asc', searchValue, searchColumn, pageSize, page, token)
                .then(res => {
                    setData(res.content)
                    setCancelChange(res.content)
                })
            setFilterOrder('asc')
        }
    }

    // Changing the filtered value of a column:
    const handleSearchFilter = (event: ChangeEvent<HTMLInputElement>, column: any) => {
        setSearchValue(event.target.value)
        setSearchColumn(column)
        
        const timeout = setTimeout(async () => {
            const token = localStorage.getItem('jwt')
            const res = await handleFilterRequest.searchFilter(column, event.target.value, pageSize, page, token)
            res.content.length === 0 ? setShowMessage(true) : setShowMessage(false)

            setData(res.content)
            setCancelChange(res.content)
            setTotal(res.totalData)
        }, 500)
        return () => clearTimeout(timeout)
    }

    // Changing the page size:
    const handlePageSize = async (event: ChangeEvent<HTMLSelectElement>) => {
        try {
            const token = localStorage.getItem('jwt')
            const req = await dataService.getUsers(searchValue, searchColumn, Number(event.target.value), page, token)
            setData(req.content)
            setCancelChange(req.content)
    
            table.setPageSize(Number(event.target.value))
            setPageSize(Number(event.target.value))
        } catch(error: any) {
            alert(error.response.data.error)
        }
    }

    // Function to handle the logout:
    const handleLogout = async () => {
        setLoading(true)
        const token = localStorage.getItem('jwt')
        try {
            await dataService.logout(token)
            localStorage.removeItem('jwt')
            navigate('/')
        } catch(error: any) {
            console.log(error.response.data.error)
        }
        setLoading(false)
    }

    //  Updating the component when 'page' changes:
    useEffect(() => {
        rerender()
    }, [page])

    // Main table:
    return (
       <div className="p-2">
            <table className="border-solid border-1 border-gray-100 block w-fit border-collapse my-6 mx-auto text-base shadow-md">
                <thead>
                    {table.getHeaderGroups().map(group => (
                        <tr key={group.id}>
                            {group.headers.map(header => (
                                <th key={header.id} colSpan={header.colSpan} className="bg-zinc-200 border-2 border-solid border-gray-300 py-0.5 px-1">
                                    {header.isPlaceholder ? null : (
                                    <>
                                        <div className={header.id === 'edit' || header.id === '1_Muni info_rol' || header.id === '1_Persona_rut' ? '' : 'cursor-pointer select-none hover:underline hover:underline-offset-2'}
                                        onClick={() => header.id === 'edit' || header.id === '1_Muni info_rol' || header.id === '1_Persona_rut' ? '' : handleFilter(header.id)}
                                        title={header.id === 'edit' || header.id === '1_Muni info_rol' || header.id === '1_Persona_rut' ? '' :  `Filter by ${header.id}`}
                                        >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        </div>
                                        {header.column.getCanFilter() ? (
                                        <div>
                                            {/* header.column */}
                                            <input
                                                type="text"
                                                onChange={event => handleSearchFilter(event, header.column.id)}
                                                placeholder='Search...'
                                                className="w-28 p-1 rounded my-2"
                                            />
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
                        <tr key={row.id} className="border-b border-solid border-gray-300 odd:bg-white even:bg-#f3f3f3" >
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className={ (row.original.role === 'admin' || row._valuesCache.role === 'superAdmin') && rol !== 'user'
                                    ? "text-left py-2 px-2.5 border-r border-solid border-gray-300 bg-cyan-50 wax-w-1 max-h-2"
                                    : "text-left py-2 px-2.5 border-r border-solid border-gray-300 wax-w-1 max-h-2"}
                                >
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={rol === 'user' ? 2 : 5}>
                            <div className="flex justify-start p-2">
                                <p className="font-medium">
                                    Showing <span className="underline decoration-1 underline-offset-2">{data.length}</span> of <span className="underline decoration-1 underline-offset-2">{total}</span> rows
                                </p>
                            </div>
                        </td>
                        <td colSpan={rol === 'user' ? 6 : 5}>
                            <div className="flex justify-end p-2 gap-6">
                                <span className="flex items-center gap-2">
                                    <p>Current page:</p>
                                    <strong>
                                        { page === 0 ? 1 : page } de {' '}
                                        { Math.floor(total / pageSize) + 1 }
                                    </strong>
                                </span>
                                <span className="flex items-center gap-2">
                                    Go to the page:
                                    <input
                                        type="text"
                                        value={page}
                                        onChange={event => {
                                            const inputValue = event.target.value
                                            const newPage = Number(inputValue)
                                          
                                            if (!Number.isNaN(newPage) && newPage > -1) {
                                              const totalPages = Math.ceil(total / pageSize)
                                              const validPage = Math.min(newPage, totalPages)
                                          
                                              setPage(validPage)
                                              rerender()
                                            }
                                          }}
                                        className={ Number(page) < 10 ? "px-2 py-1 rounded w-10" : "px-1 py-1 rounded w-10" }
                                    />
                                </span>
                                <select onChange={handlePageSize} className="px-2 py-1 rounded w-32">
                                    {[10, 20, 30, 40, 50].map((number) => (
                                        <option key={number} value={number}>
                                        Show {number}
                                        </option>
                                    ))}
                                </select>
                                <span className="flex items-center gap-1">
                                    <button
                                        className={page - 1 <= 0 ? "cursor-default py-1 px-1 border text-gray-300 border-slate-300 bg-white rounded" : "cursor-pointer py-1 px-1 border border-slate-300 bg-white hover:bg-gray-100 rounded"}
                                        onClick={() => setPage(1)}
                                        disabled={page - 1 <= 0 ? true : false}
                                        title={page - 1 <= 0 ? '' : "Go to the start"}
                                    >
                                        <BiSolidChevronsLeft size={24} />
                                    </button>
                                    <button
                                        className={page - 1 <= 0 ? 'cursor-default py-1 px-1 border text-gray-300 border-slate-300 bg-white rounded' : "cursor-pointer py-1 px-2 border border-slate-300 bg-white hover:bg-gray-100 rounded nav-button"}
                                        onClick={() => setPage(page - 1 < 1 ? 1 : page - 1)}
                                        disabled={page - 1 <= 0 ? true : false}
                                        title={page - 1 <= 0 ? '' : "Go to the previous page"}
                                        >
                                        <BiSolidChevronLeft size={24} />
                                    </button>
                                    <button
                                        className={page + 1 > Math.floor(total / pageSize) + 1 ? 'cursor-default py-1 px-1 border text-gray-300 border-slate-300 bg-white rounded' : "cursor-pointer py-1 px-2 border border-slate-300 bg-white hover:bg-gray-100 rounded nav-button"}
                                        onClick={() => setPage(page + 1)}
                                        disabled={page + 1 > Math.floor(total / pageSize) + 1 ? true : false}
                                        title={page + 1 > Math.floor(total / pageSize) + 1 ? '' : "Go to the next page"}
                                    >
                                        <BiSolidChevronRight size={24} />
                                    </button>
                                    <button
                                        className={page + 1 > Math.floor(total / pageSize) + 1 ? 'cursor-default py-1 px-1 border text-gray-300 border-slate-300 bg-white rounded' : "cursor-pointer py-1 px-2 border border-slate-300 bg-white hover:bg-gray-100 rounded nav-button"}
                                        onClick={() => setPage(Math.floor(total / pageSize) + 1)}
                                        disabled={page + 1 > Math.floor(total / pageSize) + 1 ? true : false}
                                        title={page + 1 > Math.floor(total / pageSize) + 1 ? '' : "Go to the last page"}
                                    >
                                        <BiSolidChevronsRight size={24} />
                                    </button>
                                </span>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
            {rol === 'superAdmin' ?
                <span className="flex flex-row justify-center">
                    <div className="flex justify-start pt-2 min-w-fit">
                        <button className="flex mr-2 gap-1 rounded-md bg-lime-50 px-1 py-1 ring-1 ring-inset ring-lime-600/20 hover:bg-lime-200 hover:ring-lime-500" onClick={() => setExcelComp(prev => !prev)}>
                            <RiFileExcel2Fill className="text-lime-700" size={22} />
                            <span className="text-base text-lime-700 pr-1">Handle Excel</span>
                        </button>
                    </div>

                    <div className="flex justify-start pt-2 min-w-fit">
                        <button className="flex mr-2 gap-1 rounded-md bg-yellow-50 px-1 py-1 ring-1 ring-inset ring-yellow-600/20 hover:bg-yellow-200 hover:ring-yellow-500" onClick={() => setDepComp(prev => !prev)}>
                            <BiImageAdd className="text-yellow-700" size={24} />
                            <span className="text-base text-yellow-700 pr-1">Handle Departments</span>
                        </button>
                    </div>

                    <div className="flex justify-start pt-2 min-w-fit">
                        <button className="flex mr-2 gap-1 rounded-md bg-teal-50 px-1 py-1 ring-1 ring-inset ring-yellow-600/20 hover:bg-teal-200 hover:ring-teal-500" onClick={() => setDirComp(prev => !prev)}>
                            <BiImageAdd className="text-teal-700" size={24} />
                            <span className="text-base text-teal-700 pr-1">Handle Directions</span>
                        </button>
                    </div>

                    <div className="flex justify-start pt-2 min-w-fit">
                        <button className="flex mr-2 gap-1 rounded-md bg-green-50 px-1 py-1 ring-1 ring-inset ring-green-600/20 hover:bg-green-200 hover:ring-green-500" onClick={() => setNewUserComp(prev => !prev)}>
                            <BiSolidUserPlus className="text-green-700" size={24} />
                            <span className="text-base text-green-700 pr-1">Create a new user</span>
                        </button>
                    </div>
                </span>
            : ''}
            <span className='flex flex-row justify-center'>
                <div className="flex justify-start pt-2 min-w-fit">
                    <button
                        className={!loading? "flex mr-2 gap-1 rounded-md bg-indigo-50 px-1 py-1 ring-1 ring-inset ring-green-600/20 hover:bg-indigo-200 hover:ring-indigo-500" : "flex mr-2 gap-1 rounded-md bg-gray-50 px-1 py-1 ring-1 ring-inset ring-gray-600/20"}
                        onClick={handleLogout}
                        disabled={loading}
                    >
                        <BiLogOut className="text-indigo-700" size={24} />
                        <span className='text-base text-indigo-700 pr-1'>Log out</span>
                    </button>
                {
                    loading ? <span className='text-base'>Logging out...</span> : ''
                }
                </div>
            </span>
            {/* Sections: */}
            <div id="handleExcelContainer" className={`fixed inset-0 w-full h-full ${excelComp ? '' : 'invisible'}`}>
                <div id="handleExcelBG" className={`w-full h-full duration-500 ease-out transition-all inset-0 absolute bg-gray-900 ${excelComp ? 'opacity-50' : 'opacity-0'}`} onClick={() => setExcelComp(prev => !prev)}></div>
                <div id="handleExcel" className={`w-2/5 h-full duration-150 ease-out transition-all absolute bg-gradient-to-tl from-bg-slate-400 to-bg-white right-0 top-0 ${excelComp ? '' : 'translate-x-full'}`}>
                    <ExcelComponent onFinish={() => setExcelComp(prev => !prev)} />
                </div>
            </div>
            <div id="newDependencyContainer" className={`fixed inset-0 w-full h-full ${depComp ? '' : 'invisible'}`}>
                <div id="newDependencyBG" className={`w-full h-full duration-500 ease-out transition-all inset-0 absolute bg-gray-900 ${depComp ? 'opacity-50' : 'opacity-0'}`} onClick={() => setDepComp(prev => !prev)}></div>
                <div id="newDependency" className={`w-2/5 h-full duration-150 ease-out transition-all absolute bg-gradient-to-tl from-bg-slate-400 to-bg-white right-0 top-0 ${depComp ? '' : 'translate-x-full'}`}>
                    <CreateDependency onFinish={() => setDepComp(prev => !prev)} initialDependencies={dependencies} rerenderDependency={rerenderDependency} />
                </div>
            </div>
            <div id="newDirectionContainer" className={`fixed inset-0 w-full h-full ${dirComp ? '' : 'invisible'}`}>
                <div id="newDirectionBG" className={`w-full h-full duration-500 ease-out transition-all inset-0 absolute bg-gray-900 ${dirComp ? 'opacity-50' : 'opacity-0'}`} onClick={() => setDirComp(prev => !prev)}></div>
                <div id="newDirection" className={`w-2/5 h-full duration-150 ease-out transition-all absolute bg-gradient-to-tl from-bg-slate-400 to-bg-white right-0 top-0 ${dirComp ? '' : 'translate-x-full'}`}>
                    <CreateDirection onFinish={() => setDirComp(prev => !prev)} initialDirections={directions} rerenderDirections={rerenderDirection} />
                </div>
            </div>
            <div id="newUserContainer" className={`fixed inset-0 w-full h-full ${newUserComp ? '' : 'invisible'}`}>
                <div id="newUserFormBG" className={`w-full h-full duration-500 ease-out transition-all inset-0 absolute bg-gray-900 ${newUserComp ? 'opacity-50' : 'opacity-0'}`} onClick={() => setNewUserComp(prev => !prev)}></div>
                <div id="newUserForm" className={`w-2/5 h-full duration-150 ease-out transition-all absolute bg-gradient-to-tl from-bg-slate-400 to-bg-white right-0 top-0 ${newUserComp ? '' : 'translate-x-full'}`}>
                    <CreateUser onFinish={() => setNewUserComp(prev => !prev)} rerenderDependency={rerenderDependency} />
                </div>
            </div>
            { showMessage ? 
            <div className="flex justify-center mb-5">
                <Message />
            </div>
            : '' }
       </div>
    )
}

export default GeneralTable