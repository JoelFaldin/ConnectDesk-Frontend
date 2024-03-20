import dataService from '../../../services/handleRequests'
import { ChangeEvent, useState } from "react"
import ActionButtons from "./actionButtons"

// Component's interface:
interface editDep {
    index: number,
    element: any,
    toggleEdit: () => void,
    edit: boolean,
    number: number | null,
    rerender: () => void,
}

const EditDependency: React.FC<editDep> = ({ index, element, toggleEdit, edit, number, rerender }) => {
    const [editNombre, setEditNombre] = useState<string | null>(null)
    const [editDireccion, setEditDireccion] = useState<string | null>(null)
    const initialValues = [element.nombre, element.direccion]

    // Editando valores de la dependencia:
    const handleEditDependency = (event: ChangeEvent<HTMLInputElement>) => {
        setEditNombre(event.target.value)
    }

    const handleEditDirection = (event: ChangeEvent<HTMLInputElement>) => {
        setEditDireccion(event.target.value)
    }

    // Function to send the new data to the server:
    const handleUpdate = async () => {
        if ((editNombre ?? initialValues[0]) === initialValues[0] && (editDireccion ?? initialValues[1]) === initialValues[1]) {
            alert('No has hecho cambios en ningún campo!')
        } else {
            try {
                const jwtToken = localStorage.getItem('jwt')
                const update = await dataService.updateDependency(editNombre, editDireccion, index, jwtToken)
                rerender()
                alert(update.message)
            } catch(error: any) {
                alert("The dependency's information could not be updated.")
            }
        }
        toggleEdit()
    }

    return (
        <>
            <span key={`EditarGrupo${index}`} className="py-2">
                <label htmlFor={`EditarDep${index}`} className="block text-sm font-medium leading-6 text-gray-900">Name:</label>
                <input key={`EditarDependencia${index}`}
                    type="text"
                    id={`EditarDep${index}`}
                    value={editNombre ?? element.nombre}
                    onChange={handleEditDependency}
                    className={"block min-w-fit w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                />

                <label htmlFor={`EditarDir${index}`} className="block text-sm font-medium leading-6 text-gray-900">Direction:</label>
                <input key={`EditarDireccion${index}`}
                    type="text"
                    id={`EditarDir${index}`}
                    value={editDireccion ?? element.direccion}
                    onChange={handleEditDirection}
                    className={"block min-w-fit w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"}
                />
            </span>
            <span>
                <ActionButtons toggleEdit={() => toggleEdit()} edit={edit} index={index} number={number} rerender={rerender} />
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

export default EditDependency