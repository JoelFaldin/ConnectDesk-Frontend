import { BiX, BiSolidSave, BiEdit, BiXCircle,BiSolidUserPlus   } from "react-icons/bi";

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
        meta?.makeAdmin(row.index)
    }

    return meta?.newRows[row.id] ? (
        <div className="flex">
            <a className="cursor-pointer py-0 px-2" onClick={() => setNewRows('cancelar')}>
                <BiX size={26}  />
            </a>
            {" "}
            <a className="cursor-pointer py-0 px-2" onClick={() => setNewRows('guardar')}>
                <BiSolidSave size={26}  />
            </a>
        </div>
    ) : (
        <div className="flex">
            <a className="cursor-pointer py-0 px-2" onClick={() => setNewRows('editar')}>
                <span className="inline">
                    <BiEdit size={26} />
                </span>
                {/* Se puede editar el color del icon con color="blue", también se pueden poner colores en hexadecimal!!! */}
            </a>
            <a className="cursor-pointer py-0 px-2" onClick={deleteUser}>
                <span className="inline">
                    <BiXCircle size={26}  />
                </span>
            </a>
            <a className="cursor-pointer py-0 px-2" onClick={makeAdmin}>
                <span className="inline">
                    <BiSolidUserPlus size={26}  />
                </span>
            </a>
        </div>
    )
}

export default AdminEditCell