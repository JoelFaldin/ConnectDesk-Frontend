import dataService from '../../../services/handleRequests'
import { ChangeEvent, useState } from "react"
import ActionButtons from "./actionButtons"

// Component's interface:
interface editDep {
    id: string,
    element: any,
    toggleEdit: () => void,
    edit: boolean,
    rerender: () => void,
}

const EditDepartment: React.FC<editDep> = ({ id, element, toggleEdit, edit, rerender }) => {
    const [editNombre, setEditNombre] = useState<string | null>(null)
    const initialValues = [element.nombre, element.direccion]

    // Editing department values:
    const handleEditDepartment = (event: ChangeEvent<HTMLInputElement>) => {
        setEditNombre(event.target.value)
    }

    // Function to send the new data to the server:
    const handleUpdate = async () => {
        if ((editNombre ?? initialValues[0]) === initialValues[0]) {
            alert('You havent made any changes!')
        } else {
            try {
                const jwtToken = localStorage.getItem('jwt')
                const update = await dataService.updateDepartment(editNombre, id, jwtToken)
                rerender()
                alert(update.message)
            } catch(error: any) {
                alert("The department's information could not be updated.")
            }
        }
        toggleEdit()
    }

    return (
        <>
            <span key={`EditGroup${id}`} className="py-2">
                <label htmlFor={`EditDep${id}`} className="block text-sm font-medium leading-6 text-gray-900">Name:</label>
                <input key={`EditDepartment${id}`}
                    type="text"
                    id={`EditarDep${id}`}
                    value={editNombre ?? element.name}
                    onChange={handleEditDepartment}
                    className={"block min-w-fit w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                />
            </span>
            <span>
                <ActionButtons toggleEdit={() => toggleEdit()} id={element.id} edit={edit} rerender={rerender} />
                <button
                    className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10 hover:bg-green-200"
                    onClick={handleUpdate}
                >
                    Save
                </button>
            </span>
        </>
    )
}

export default EditDepartment