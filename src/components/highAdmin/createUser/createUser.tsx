import handleRequests from "../../../services/handleRequests"
import rutFormater from "../../../services/rutFormater"
import { ChangeEvent, useState } from "react"
import { BiArrowBack } from "react-icons/bi"

// Interfaz para el componente:
interface newUser {
    onFinish: () => void,
    initialDependencies: Array<any>,
    rerenderDependency: () => void
}

const CreateUser: React.FC<newUser> = ({ onFinish, initialDependencies, rerenderDependency }) => {
    // Estados para guardar la información del nuevo usuario:
    const [newRut, setNewRut] = useState('')
    const [rutWarning, setRutWarning] = useState(false)
    const [nombres, setNombres] = useState('')
    const [nombreWarning, setNombreWarning] = useState(false)
    const [apellidos, setApellidos] = useState('')
    const [apellidoWarning, setApellidoWarning] = useState(false)
    const [email, setEmail] = useState('')
    const [emailWarning, setEmailWarning] = useState(false)
    const [dependencias, setDependencias] = useState('Municipalidad norte')
    const [direccion, setDireccion] = useState('')
    const [direccionWarning, setDireccionWarning] = useState(false)
    const [numMuni, setNumMuni] = useState('')
    const [anexo, setAnexo] = useState('')
    const [anexoWarning, setAnexoWarning] = useState(false)
    const [password, setPassword] = useState('')
    const [passWarning, setPassWarning] = useState(false)
    const [rol, setRol] = useState('user')

    // Mandando los datos del nuevo usuario al servidor:
    const handleNewUser = async (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault()
        const newUser = {
            rut: newRut,
            nombres,
            apellidos,
            email,
            passHash: password,
            rol,
            dependencias,
            direcciones: direccion,
            numMunicipal: numMuni,
            anexoMunicipal: anexo
        }
        if (newRut === '') {
            setRutWarning(true)
            return
        } else if (nombres === '') {
            setNombreWarning(true)
            return
        } else if (apellidos === '') {
            setApellidoWarning(true)
            return
        } else if (email === '') {
            setEmailWarning(true)
            return
        } else if (direccion === '') {
            setDireccionWarning(true)
            return
        } else if (anexo === '') {
            setAnexoWarning(true)
            return
        } else if (password === '') {
            setPassWarning(true)
            return
        }

        // Revisando que el objeto no tenga campos vacíos:
        const filterEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        if (filterEmail.test(email)) {
            try {
                const jwtToken = localStorage.getItem('jwt')
                const userCrated = await handleRequests.createUser(newUser, jwtToken)
                // Limpiando los datos una vez la petición se compelta:
                setNewRut('')
                setNombres('')
                setApellidos('')
                setEmail('')
                setDependencias('Municipalidad norte')
                setDireccion('')
                setNumMuni('')
                setAnexo('')
                setPassword('')
                setRol('user')
                alert(userCrated.message)
                onFinish()
            } catch(error: any) {
                alert(error.response.data.error)
            }
        } else {
            alert('Formato de correo incorrecto!')
        }
        rerenderDependency()
    }

    // Set de funciones que cambian el valor de cada elemento:
    const handleRut = (event: ChangeEvent<HTMLInputElement>) => {
        const rut = event.target.value
        if (event.target.value === '') {
            setRutWarning(true)
        } else if (rutFormater(rut)) {
            setNewRut(rut)
            setRutWarning(false)
        }
    }

    const handleNombre = (event: ChangeEvent<HTMLInputElement>) => {
        const nombre = event.target.value
        if (event.target.value === '') {
            setNombreWarning(true)
        } else {
            setNombres(nombre)
            setNombreWarning(false)
        }
    }

    const handleApellido = (event: ChangeEvent<HTMLInputElement>) => {
        const apellido = event.target.value
        if (event.target.value === '') {
            setApellidoWarning(true)
        } else {
            setApellidos(apellido)
            setApellidoWarning(false)
        }
    }

    const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
        const email = event.target.value
        if (event.target.value === '') {
            setEmailWarning(true)
        } else {
            setEmail(email)
            setEmailWarning(false)
        }
    }

    const handleRol = (event: ChangeEvent<HTMLSelectElement>) => {
        switch (event.target.value) {
            case 'superAdmin':
                setRol('superAdmin')
                break
            case 'admin':
                setRol('admin')
                break
            case 'user':
                setRol('user')
                break
            default:
                setRol('user')
        }
    }

    const handleDireccion = (event: ChangeEvent<HTMLInputElement>) => {
        const direccion = event.target.value
        if (event.target.value === '') {
            setDireccionWarning(true)
        } else {
            setDireccion(direccion)
            setDireccionWarning(false)
        }
    }

    const handleNumMuni = (event: ChangeEvent<HTMLInputElement>) => {
        const filterNumber = /[^0-9\s+]/g
        if (filterNumber.test(event.target.value) || event.target.value.length + 1 === 17) {
            return
        } else {
            setNumMuni(event.target.value)
        }
    }

    const handleAnexo = (event: ChangeEvent<HTMLInputElement>) => {
        const filterAnexo = /[^0-9]/g
        if (filterAnexo.test(event.target.value) || event.target.value.length + 1 === 11) {
            return
        } else if (event.target.value === '') {
            setAnexoWarning(true)
        } else {
            setAnexo(event.target.value)
        }
    }
 
    const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
        const pass = event.target.value
        if (event.target.value === '') {
            setPassWarning(true)
        } else {
            setPassword(pass)
            setPassWarning(false)
        }
    }

    return (
        <div className="h-fit max-h-full overflow-y-scroll">
            <button className="w-fit inline-flex items-center mt-10 ml-10 text-xs" title="Volver" onClick={onFinish}>
                <BiArrowBack size={24} />
            </button>
            <div className="max-w-6/12 mx-auto">
                <h1 className="text-center text-xl font-bold p-4">Añadir un nuevo usuario</h1>
                    <form>
                    <div className="flex justify-center mt-7">
                        <section className="pr-9 max-w-fit">
                            <h2 className="text-xl font-medium pb-2 underline decoration-solid underline-offset-2">Información personal</h2>

                            <label htmlFor="crearRut" className="block text-sm font-medium leading-6 text-gray-900">Rut:</label>
                            <div className="mb-2">
                                <input id="crearRut"
                                    name="rut"
                                    type="text"
                                    required
                                    className={!rutWarning ? "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" : "block w-full rounded-md border-0 py-1.5 text-red-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"}
                                    onChange={handleRut}
                                    value={newRut}
                                    placeholder="12.345.678-9" 
                                />
                            </div>

                            <label htmlFor="crearNombres" className="block text-sm font-medium leading-6 text-gray-900">Nombres:</label>
                            <div className="mb-2">
                                <input id="crearNombres"
                                    name="nombres"
                                    type="text"
                                    required
                                    className={!nombreWarning ? "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" : "block w-full rounded-md border-0 py-1.5 text-red-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"}
                                    onChange={handleNombre}
                                    value={nombres}
                                    placeholder="Nombre(s)..."
                                />
                            </div>

                            <label htmlFor="crearApellidos" className="block text-sm font-medium leading-6 text-gray-900" >Apellidos:</label>
                            <div className="mb-2">
                                <input
                                    id="crearApellidos"
                                    name="apellidos"
                                    type="text"
                                    required
                                    className={!apellidoWarning ? "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" : "block w-full rounded-md border-0 py-1.5 text-red-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"}
                                    onChange={handleApellido}
                                    value={apellidos}
                                    placeholder="Apellido(s)..."
                                />
                            </div>

                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Correo Electrónico:</label>
                            <div className="mb-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className={!emailWarning ? "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" : "block w-full rounded-md border-0 py-1.5 text-red-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"}
                                    onChange={handleEmail}
                                    value={email}
                                    placeholder="ejemplo@correo.com"
                                    />
                            </div>
                        </section>

                        <section className="pl-9 max-w-fit">
                            <h3 className="text-xl font-medium pb-2 underline decoration-solid underline-offset-2">Información de trabajo</h3>

                            <label htmlFor="rol" className="block text-sm font-medium leading-6 text-gray-900">Rol:</label>
                            <div className="mb-2">
                                <select
                                    id="rol"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleRol}
                                    value={rol}
                                >
                                    <optgroup label="-- Seleccionar una opción">
                                        <option>user</option>
                                        <option>admin</option>
                                        <option>superAdmin</option>
                                    </optgroup>
                                </select>
                            </div>

                            <label htmlFor="dependencias" className="block text-sm font-medium leading-6 text-gray-900">Dependencias:</label>
                            <div className="mb-2">
                                <select
                                    id="dependencias"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={event => setDependencias(event.target.value)}
                                    value={dependencias}
                                >
                                        <optgroup label="-- Selecciona una opción">
                                            {
                                                initialDependencies.map((item, index) => {
                                                    return <option key={`dependency${index}`}>{item.nombre}</option>
                                                })
                                            }
                                        </optgroup>
                                </select>
                            </div>
                            
                            <label htmlFor="direcciones" className="block text-sm font-medium leading-6 text-gray-900">Direcciones:</label>
                            <div className="mb-2">
                                <input
                                    id="direcciones"
                                    name="dirección"
                                    type="text"
                                    required
                                    className={!direccionWarning ? "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" : "block w-full rounded-md border-0 py-1.5 text-red-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"}
                                    onChange={handleDireccion}
                                    value={direccion}
                                    placeholder="Iquique"
                                />
                            </div>

                            <label htmlFor="num-muni" className="block text-sm font-medium leading-6 text-gray-900">Número municipal:</label>
                            <div className="mb-2">
                                <input
                                    id="num-muni"
                                    name="numeroMunicipal"
                                    type="text"
                                    required={false}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleNumMuni} placeholder="9 1111 1111" value={numMuni}
                                />
                            </div>

                            <label htmlFor="anexo-muni" className="block text-sm font-medium leading-6 text-gray-900">Anexo municipal:</label>
                            <div className="mb-2">
                                <input
                                    id="anexo-muni"
                                    name="anexoMunicipal"
                                    type="text"
                                    required
                                    className={!anexoWarning ? "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" : "block w-full rounded-md border-0 py-1.5 text-red-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"}
                                    onChange={handleAnexo}
                                    placeholder="9999"
                                    value={anexo} />
                            </div>
                        </section>
                    </div>
                    
                    <section className="flex flex-col justify-center items-center mt-7">
                        <label htmlFor="contraseña" className="block text-sm font-medium leading-6 text-gray-900">Ingrese una contraseña:</label>
                        <div className="mb-2">
                            <input 
                                id="contraseña"
                                name="contraseña"
                                type="password"
                                required
                                className={!passWarning ? "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" : "block w-full rounded-md border-0 py-1.5 text-red-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"}
                                onChange={handlePassword}
                                value={password}
                            />
                            <input id="submit"
                                name="submit"
                                type="submit"
                                className="block w-full mb-4 mt-4 py-1.5 text-l text-center items-center rounded-md bg-indigo-200 px-2 font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 hover:cursor-pointer hover:ring-indigo-800 hover:bg-indigo-300"
                                onClick={handleNewUser}
                                value="Registrar Usuario" />
                        </div>
                    </section>
                </form>

            </div>
        </div>
    )
}

export default CreateUser