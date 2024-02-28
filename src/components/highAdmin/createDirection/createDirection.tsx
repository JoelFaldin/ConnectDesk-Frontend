import { BiArrowBack } from "react-icons/bi"
import { ChangeEvent, useState } from "react"
import dataService from '../../../services/handleRequests'
import ActionButtons from "./actionButtons"
import EditDirection from "./editDirection"

interface directions {
    direccion: string
}

interface directionComponent {
    onFinish: () => void,
    initialDirections: Array<any>
    rerenderDirections: () => void
}

const createDirection: React.FC<directionComponent> = ({ onFinish, initialDirections, rerenderDirections }) => {
    const [newDirection, setNewDirection] = useState('')
    const [directionWarning, setDirectionWarning] = useState(false)
    
    // Estado para editar:
    const [editDirection, setEditDirection] = useState<null | number>(null)

    const handleDirectionName = (event: ChangeEvent<HTMLInputElement>) => {
        setNewDirection(event.target.value)
        if (event.target.value === '') {
            setDirectionWarning(true)
        } else {
            setDirectionWarning(false)
        }
    }

    const handleNewDirection = async (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault()
        if (newDirection === '') {
            setDirectionWarning(true)
            return
        } else {
            try {
                const token = localStorage.getItem('jwt')
                const dir = await dataService.createDirection(newDirection, token)
                alert(dir.message)
                setNewDirection('')
            } catch (error: any) {
                alert(error.response.data.error)
            }
        }
        rerenderDirections()
    }

    const toggleEdit = (index: number) => {
        setEditDirection(prev => prev === index ? null : index)
    }

    return (
        <div className="h-fit max-h-full overflow-y-scroll">
            <button className="w-fit inline-flex items-center mt-10 ml-10 text-xs" title="Volver" onClick={onFinish}>
                <BiArrowBack size={24} />
            </button>

            <h1 className="text-center text-xl font-bold p-4">Gestionar Direcciones</h1>
            <div className="max-w-6/12 mt-10 mx-auto flex justify-center">
                <section className="pr-9 max-w-fit">
                <h2 className="text-xl font-medium pb-2 underline decoration-solid underline-offset-2">Existentes:</h2>
                    {
                        initialDirections.length === 0 ? (
                            <p>No hay dependencias creadas.</p>
                        ) : (
                            <ul>
                            {initialDirections.map((element: directions, index: number) => (
                                <li key={`Grupo${index}`} className="pb-2 mb-8">
                                {editDirection !== index ? (
                                    <>
                                        <p key={`Dependencia${index}`} className="mb-1">{element.direccion}</p>
                                        <ActionButtons key={`ActionComponent${index}`} toggleEdit={() => toggleEdit(index)} edit={editDirection === null ? false : true} index={index} number={editDirection} rerender={rerenderDirections} />
                                    </>
                                ) : (
                                    <EditDirection key={`EditComponent${index}`} index={index} element={element} toggleEdit={() => toggleEdit(index)} edit={editDirection === null ? false : true} number={editDirection} rerender={rerenderDirections} />
                                )}
                                </li>
                            ))}
                            </ul>
                        )
                    }
                </section>

                <section className="pl-9 max-w-fit">
                    <h2 className="text-xl font-medium pb-2 underline decoration-solid underline-offset-2">Crear nueva:</h2>
                    <form>
                        <label htmlFor="directionName" className="block text-sm font-medium leading-6 text-gray-900">Nombre de la dirección:</label>
                        <input id="direcionName"
                            name="nuevaDireccion"
                            type="text"
                            required
                            className={directionWarning ? "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-red-600 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                            onChange={handleDirectionName}
                            value={newDirection}
                        />

                        <input id="submitDirection"
                            name="submit"
                            type="submit"
                            className={directionWarning ? "block w-full mt-4 py-1.5 text-l text-center items-center rounded-md bg-gray-200 px-2 font-medium text-gray-700 ring-1 ring-inset ring-gray-700/10 hover:cursor-default" : "block w-full mt-4 py-1.5 text-l text-center items-center rounded-md bg-indigo-200 px-2 font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 hover:cursor-pointer hover:ring-indigo-800 hover:bg-indigo-300"}
                            onClick={handleNewDirection}
                            value="Agregar dependencia"
                            disabled={directionWarning ? true : false}
                        />
                    </form>
                </section>
            </div>
        </div>
    )
}

export default createDirection
