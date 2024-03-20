import { BiX, BiSolidSave, BiEdit, BiXCircle,BiSolidUserPlus   } from "react-icons/bi";

// Table interface:
interface editCell {
    row: any,
    table: any,
}

const AdminEditCell: React.FC<editCell> = ({ row, table }) => {
    // This definition allow access to the functions in the table definition (in generalTable.tsx):
    const meta = table.options.meta

    const setNewRows = (name: string) => {
        if (name === 'guardar') {
            meta?.uploadData()
        }
        
        meta?.setNewRows((old: []) => ({
            ...old,
            [row.id]: !old[row.id]
        }))

        if (name !== 'editar') {
            meta?.revertData(row.index, name === 'cancelar')
        }
    }

    const deleteUser = () => {
        meta?.removeRow(row.index)
    }

    const makeAdmin = () => {
        meta?.makeAdmin(row.index)
    }

    // Rendering different action buttons depending of it is editing or not (as superAdmin):
    return meta?.newRows[row.id] ? (
        <div className="flex">
            <a className="cursor-pointer py-0 px-2" onClick={() => setNewRows('cancelar')} title="Cancel">
                <BiX size={26} className="hover:text-rose-700" />
            </a>
            {" "}
            <a className="cursor-pointer py-0 px-2" onClick={() => setNewRows('guardar')} title="Save">
                <BiSolidSave size={26} className="hover:text-lime-600" />
            </a>
        </div>
    ) : (
        <div className="flex">
            <a className="cursor-pointer py-0 px-2" onClick={() => setNewRows('editar')} title="Edit">
                <span className="inline">
                    <BiEdit size={26} className="hover:text-green-500" />
                </span>
            </a>
            <a className="cursor-pointer py-0 px-2" onClick={deleteUser} title="Delete">
                <span className="inline">
                    <BiXCircle size={26} className="hover:text-red-500" />
                </span>
            </a>
            <a className="cursor-pointer py-0 px-2" onClick={makeAdmin} title="Turn into admin">
                <span className="inline">
                    <BiSolidUserPlus size={26} className="hover:text-purple-500" />
                </span>
            </a>
        </div>
    )
}

export default AdminEditCell