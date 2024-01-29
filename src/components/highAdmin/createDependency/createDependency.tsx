import { ChangeEvent, useEffect, useState } from "react"
import dataService from '../../../services/handleRequests'
import EditDependency from "./editDependency"

interface newDependency {
    onFinish: () => void
}

interface dependencies {
    nombre: string,
    direccion: string
}

const createDependency: React.FC<newDependency> = ({ onFinish }) => {
    const [dependencies, setDependencies] = useState<any>([])
    const [newDependencyName, setNewDependencyName] = useState('')
    const [newDireccion, setNewDireccion] = useState('')
    const [nameWarning, setNameWarning] = useState(false)
    const [dirWarning, setDirWarning] = useState(false)
    
    // Estados para editar:
    const [editState, setEditState] = useState(false)

    useEffect(() => {
        dataService.getDependencies()
            .then(data => {
                setDependencies(data)
            })
    }, [])

    const handleDependencyName = (event: ChangeEvent<HTMLInputElement>) => {
        setNewDependencyName(event.target.value)
        if (event.target.value === '') {
            setNameWarning(true)
        } else {
            setNameWarning(false)
        }
    }

    const handleDireccion = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setNewDireccion(event.target.value)
        if (event.target.value === '') {
            setDirWarning(true)
        } else {
            setDirWarning(false)
        }
    }

    const handleNewDependency = async (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault()
        if (newDependencyName === '') {
            setNameWarning(true)
            return
        } else if (newDireccion === '') {
            setDirWarning(true)
            return
        } else {
            try {
                const jwtToken = localStorage.getItem('jwt')
                await dataService.createDependency(newDependencyName, newDireccion, jwtToken)
                setNewDependencyName('')
                setNewDireccion('')
                onFinish()
            } catch(error: any) {
                alert(error.response.data.error)
            }
        }
    }

    return (
        <div className="h-fit">
            <h1 className="text-center text-xl font-bold p-4 mt-32">Gestionar dependencias</h1>
            <div className="max-w-6/12 mt-10 mx-auto flex justify-center gap-8">
                <section className="pr-9 max-w-fit">
                    <h2 className="text-xl font-medium pb-2">Dependencias existentes:</h2>
                    {
                        dependencies.length === 0
                            ? <p>No hay dependencias creadas.</p>
                            : <ul>
                                {
                                    dependencies.map((element: dependencies, index: number) => {
                                        return editState ? (
                                            <li key={`Grupo${index}`} className="pb-2">
                                                <p key={`Dependencia${index}`}>{element.nombre}</p>
                                                <i key={`Direccion${index}`} className="text-base pl-4">{element.direccion}</i>
                                            </li>
                                        ) : (
                                            <EditDependency index={index} element={element} />
                                        )
                                    })
                                }
                            </ul>
                            
                    }
                </section>
                <section className="pl-9 max-w-fit">
                    <h2 className="text-xl font-medium pb-2">Crear dependencia:</h2>
                    <form>
                        <label htmlFor="dependencyName" className="block text-sm font-medium leading-6 text-gray-900">Nombre de la dependencia:</label>
                        <input id="dependencyName"
                            name="nuevaDependencia"
                            type="text"
                            required
                            className={nameWarning ? "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-red-600 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                            onChange={handleDependencyName}
                            value={newDependencyName}
                            placeholder="Municipalidad..."
                        />

                        <label htmlFor="direccion" className="block text-sm font-medium leading-6 text-gray-900">Dirección:</label>
                        <textarea id="direccion"
                            name="direccion"
                            required
                            className={dirWarning ? "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-red-600 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 h-fit" : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-fit"}
                            onChange={handleDireccion}
                            value={newDireccion}
                            placeholder="Av. Serrano..."
                        />

                        <input id="submitDependency"
                            name="submit"
                            type="submit"
                            className={nameWarning || dirWarning ? "block w-full mt-4 py-1.5 text-l text-center items-center rounded-md bg-gray-200 px-2 font-medium text-gray-700 ring-1 ring-inset ring-gray-700/10 hover:cursor-default" : "block w-full mt-4 py-1.5 text-l text-center items-center rounded-md bg-indigo-200 px-2 font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 hover:cursor-pointer hover:ring-indigo-800 hover:bg-indigo-300"}
                            onClick={handleNewDependency}
                            value="Agregar dependencia"
                            disabled={nameWarning || dirWarning ? true : false}
                        />
                    </form>
                </section>
            </div>
        </div>
    )
}

export default createDependency