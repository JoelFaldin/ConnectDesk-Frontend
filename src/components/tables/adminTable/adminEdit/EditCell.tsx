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
        <>
            <a className="custom-button" onClick={() => setNewRows('cancelar')}>
                <BiX size={26} />
            </a>
            {" "}
            <a className="custom-button" onClick={() => setNewRows('guardar')}>
                <BiSolidSave size={26} />
            </a>
        </>
    ) : row.original.rol === 'admin' || row.original.rol === 'superAdmin' ? '' : (
        <a className="custom-button" onClick={() => setNewRows('editar') }>
            <BiEdit size={26} />
        </a>
    )
}

export default EditCell