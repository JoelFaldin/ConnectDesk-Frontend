import { ChangeEvent, useState } from "react"
import ActionButtons from "./actionButtons"

interface editDep {
    index: number,
    element: any,
    toggleEdit: () => void,
    rerender: () => void
}

const EditDependency: React.FC<editDep> = ({ index, element, toggleEdit, rerender }) => {
    const [editNombre, setEditNombre] = useState<string | null>(null)
    const [editDireccion, setEditDireccion] = useState<string | null>(null)

    const handleEditDependency = (event: ChangeEvent<HTMLInputElement>) => {
        setEditNombre(event.target.value)
    }

    const handleEditDirection = (event: ChangeEvent<HTMLInputElement>) => {
        setEditDireccion(event.target.value)
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
                    className={"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                />
            </span>
            <ActionButtons toggleEdit={toggleEdit} index={index} rerender={rerender} />
        </>
    )
}

export default EditDependency