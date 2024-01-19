import { BiX, BiSolidSave, BiEdit, BiXCircle,BiSolidUserPlus   } from "react-icons/bi";
import dataService from '../../../../services/handleRequests'
import '../styleCell.css'

interface editCell {
    row: any,
    table: any,
}

const AdminEditCell: React.FC<editCell> = ({ row, table }) => {
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

    const deleteUser = () => {
        meta?.removeRow(row.index)
    }

    const makeAdmin = () => {
        const rut = row.original.rut
        dataService.makeAdmin(rut)
            .then(res => console.log(res))
            .catch(error => console.log(error.message))
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
    ) : (
        <>
            <a className="custom-button" onClick={() => setNewRows('editar')}>
                <BiEdit size={26} />
                {/* Se puede editar el color del icon con color="blue", también se pueden poner colores en hexadecimal!!! */}
            </a>
            <a className="custom-button" onClick={deleteUser}>
                <BiXCircle size={26} />
            </a>
            <a className="custom-button">
                <BiSolidUserPlus size={26} onClick={makeAdmin} />
            </a>
        </>
    )
}

export default AdminEditCell