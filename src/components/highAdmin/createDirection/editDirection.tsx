import { ChangeEvent, useState } from "react"
import dataService from '../../../services/handleRequests'
import ActionButtons from "./actionButtons"

// Component's interface:
interface editDir {
    index: number,
    element: any,
    toggleEdit: () => void,
    edit: boolean,
    number: number | null,
    rerender: () => void
}

const EditDirection: React.FC<editDir> = ({ index, element, toggleEdit, edit, number, rerender }) => {
    const [editDirection, setEditDirection] = useState<string | null>(null)
    const initialValues = element.direccion

    const handleEditDirection = (event: ChangeEvent<HTMLInputElement>) => {
        setEditDirection(event.target.value)
    }

    const handleUpdateDirection = async () => {
        if (editDirection === initialValues) {
            alert("You haven't made any changes!")
        } else {
            try {
                const token = localStorage.getItem('jwt')
                const update = await dataService.updateDirection(editDirection, index, token)
                alert(update.message)
            } catch(error: any) {
                alert(error.response.data.error)
            }
        }
        rerender()
        toggleEdit()
    }

    return (
        <>
            <span key={`EditarNuevoGrupo${index}`} className="py-2">
                <label htmlFor={`EditarDir${index}`} className="block text-sm font-medium leading-6 text-gray-900">Direction:</label>
                <input key={`EditarDireccion${index}`}
                    type="text"
                    id={`EditarDir${index}`}
                    value={editDirection ?? element.direccion}
                    onChange={handleEditDirection}
                    className={"block min-w-fit w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                />
            </span>
            <span>
                <ActionButtons toggleEdit={() => toggleEdit()} edit={edit} index={index} number={number} rerender={rerender} />
                <button
                    className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10 hover:bg-green-200"
                    onClick={handleUpdateDirection}
                >
                    Save
                </button>
            </span>
        </>
    )
}

export default EditDirection