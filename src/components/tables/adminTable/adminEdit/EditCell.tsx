import { BiX, BiSolidSave, BiEdit } from "react-icons/bi";
import '../styleCell.css'

interface editCell {
    row: any,
    table: any,
}

const EditCell: React.FC<editCell> = ({ row, table }) => {
    const meta = table.options.meta
    

    const setNewRows = (name: string) => {
        console.log(row.original.rol)
        meta?.setNewRows((old: []) => ({
            ...old,
            [row.id]: !old[row.id]
        }))

        if (name !== 'editar') {
            meta?.revertData(row.index, name === 'cancelar')
        }
    }    

    return meta?.newRows[row.id] ? (
        <div className="flex flex-row justify-center">
            <a className="cursor-pointer py-0 px-2" onClick={() => setNewRows('cancelar')}>
                <BiX size={26} />
            </a>
            {" "}
            <a className="cursor-pointer py-0 px-2" onClick={() => setNewRows('guardar')}>
                <BiSolidSave size={26} />
            </a>
        </div>
    ) : row.original.rol === 'admin' || row.original.rol === 'superAdmin' ? '' : (
        <div className="flex flex-row justify-center">
            <a className="cursor-pointer py-0 px-2" onClick={() => setNewRows('editar') }>
                <BiEdit size={26} />
            </a>
        </div>
    )
}

export default EditCell