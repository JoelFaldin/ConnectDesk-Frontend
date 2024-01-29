import { ChangeEvent, useState } from "react"
import ActionButtons from "./actionButtons"
import dataService from '../../../services/handleRequests'

interface editDep {
    index: number,
    element: any,
    toggleEdit: () => void,
    rerender: () => void
}

const EditDependency: React.FC<editDep> = ({ index, element, toggleEdit, rerender }) => {
    const [editNombre, setEditNombre] = useState<string | null>(null)
    const [editDireccion, setEditDireccion] = useState<string | null>(null)
    const initialValues = [element.nombre, element.direccion]

    const handleEditDependency = (event: ChangeEvent<HTMLInputElement>) => {
        setEditNombre(event.target.value)
    }

    const handleEditDirection = (event: ChangeEvent<HTMLInputElement>) => {
        setEditDireccion(event.target.value)
    }

    const handleUpdate = async () => {
        if ((editNombre ?? initialValues[0]) === initialValues[0] && (editDireccion ?? initialValues[1]) === initialValues[1]) {
            confirm('No has hecho cambios en ningún campo!')
        } else {
            const jwtToken = localStorage.getItem('jwt')
            await dataService.updateDependency(editNombre, editDireccion, index, jwtToken)
        }
    }


    return (
        <>
            <span key={`EditarGrupo${index}`} className="py-2">
                <label htmlFor={`EditarDep${index}`} className="block text-sm font-medium leading-6 text-gray-900">Nombre:</label>
                <input key={`EditarDependencia${index}`}
                    type="text"
                    id={`EditarDep${index}`}
                    value={editNombre ?? element.nombre}
                    onChange={handleEditDependency}
                    className={"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                />

                <label htmlFor={`EditarDir${index}`} className="block text-sm font-medium leading-6 text-gray-900">Dirección:</label>
                <input key={`EditarDireccion${index}`}
                    type="text"
                    id={`EditarDir${index}`}
                    value={editDireccion ?? element.direccion}
                    onChange={handleEditDirection}
                    className={"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"}
                />
            </span>
            <span>
                <ActionButtons toggleEdit={toggleEdit} index={index} rerender={rerender} />
                <button
                    className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10 hover:bg-green-200"
                    onClick={handleUpdate}
                >
                    Guardar
                </button>
            </span>
        </>
    )
}

export default EditDependency