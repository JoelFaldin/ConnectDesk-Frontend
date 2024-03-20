import { BiX, BiSolidSave, BiEdit } from "react-icons/bi";

// Table interface:
interface editCell {
    row: any,
    table: any,
}

const EditCell: React.FC<editCell> = ({ row, table }) => {
    // This definition allow access to the functions in the table definition (in generalTable.tsx):
    const meta = table.options.meta
    

    const setNewRows = (name: string) => {
        meta?.setNewRows((old: []) => ({
            ...old,
            [row.id]: !old[row.id]
        }))

        if (name !== 'editar') {
            meta?.revertData(row.index, name === 'cancelar')
        }
    }

    // Rendering different action buttons depending of it is editing or not (as superAdmin):
    return meta?.newRows[row.id] ? (
        <div className="flex flex-row justify-center">
            <a className="cursor-pointer py-0 px-2" onClick={() => setNewRows('cancelar')} title="Cancel">
                <BiX size={26} className="hover:text-rose-700" />
            </a>
            {" "}
            <a className="cursor-pointer py-0 px-2" onClick={() => setNewRows('guardar')} title="Save">
                <BiSolidSave size={26} className="hover:text-lime-600" />
            </a>
        </div>
    ) : row.original.rol === 'admin' || row.original.rol === 'superAdmin' ? '' : (
        <div className="flex flex-row justify-center">
            <a className="cursor-pointer py-0 px-2" onClick={() => setNewRows('editar')} title="Edit">
                <BiEdit size={26} className="hover:text-green-500" />
            </a>
        </div>
    )
}

export default EditCell