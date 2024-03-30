import handleRequests from "../../../services/handleRequests"
import { ChangeEvent, useState, useEffect } from "react"
import { BiArrowBack } from "react-icons/bi"

// Component's interface:
interface newUser {
    onFinish: () => void,
    rerenderDependency: () => void,
}   

const CreateUser: React.FC<newUser> = ({ onFinish, rerenderDependency }) => {
    // States to store the user's information:
    const [newIdentifier, setNewIdentifier] = useState('')
    const [identifierWarning, setIdentifierWarning] = useState(false)
    const [names, setNames] = useState('')
    const [nameWarning, setNameWarning] = useState(false)
    const [lastNames, setLastNames] = useState('')
    const [lastNameWarning, setLastNameWarning] = useState(false)
    const [email, setEmail] = useState('')
    const [emailWarning, setEmailWarning] = useState(false)
    const [departments, setDepartments] = useState('')
    const [directions, setDirections] = useState('')
    const [jobNumber, setJobNumber] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [contactWarning, setContactWarning] = useState(false)
    const [password, setPassword] = useState('')
    const [passWarning, setPassWarning] = useState(false)
    const [role, setRole] = useState('user')

    // Interface for the interface:
    interface dependencyInterface {
        nombre: String,
        direccion: String
    }

    interface directionInterface {
        direccion: String
    }

    // Interface for the state:
    interface initialDataInterface {
        dependencies: dependencyInterface[],
        directions: directionInterface[]
    }
    // States that need a call to the server:
    const [initialData, setInitialData] = useState<initialDataInterface>({ dependencies: [], directions: [] })


    // Automatically setting dependencies and direction states:
    useEffect(() => {
        const getDeps = async () => {
            const jwt = localStorage.getItem('jwt')
            const [deps, dirs] = await Promise.all([
                handleRequests.getDependencies(jwt),
                handleRequests.getDirections(jwt)
            ])
            setInitialData({ dependencies: deps.request, directions: dirs.directions })
        }

        getDeps()
    }, [])

    // Sending data of a new     to the server:
    const handleNewUser = async (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault()
        const newUser = {
            identifier: newIdentifier,
            names,
            lastNames,
            email,
            passHash: password,
            role,
            departments: departments === '' ? initialData.dependencies[0].nombre : departments,
            directions: directions === '' ? initialData.directions[0].direccion : directions,
            jobNumber: jobNumber,
            contactNumber: contactNumber
        }

        if (newIdentifier === '') {
            setIdentifierWarning(true)
            return
        } else if (names === '') {
            setNameWarning(true)
            return
        } else if (lastNames === '') {
            setLastNameWarning(true)
            return
        } else if (email === '') {
            setEmailWarning(true)
            return
        } else if (contactNumber === '') {
            setContactWarning(true)
            return
        } else if (password === '') {
            setPassWarning(true)
            return
        }

        // Checking that the object does not has empty fields:
        const filterEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        if (filterEmail.test(email)) {
            try {
                const jwtToken = localStorage.getItem('jwt')
                const userCrated = await handleRequests.createUser(newUser, jwtToken)
                // Clearing the fields when the request is completed:
                setNewIdentifier('')
                setNames('')
                setLastNames('')
                setEmail('')
                setDepartments('')
                setDirections('')
                setJobNumber('')
                setContactNumber('')
                setPassword('')
                setRole('user')
                alert(userCrated.message)
                onFinish()
            } catch(error: any) {
                alert(error.response.data.error)
            }
        } else {
            alert('Wrong email format!')
        }
        rerenderDependency()
    }

    // Functions that change the value of each element:
    const handleIdentifier = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 12) {
            setIdentifierWarning(false)
            setNewIdentifier(event.target.value)
        } else {
            ''
        }
    }

    const handleName = (event: ChangeEvent<HTMLInputElement>) => {
        setNameWarning(false)
        setNames(event.target.value)
    }

    const handleLastname = (event: ChangeEvent<HTMLInputElement>) => {
        setLastNames(event.target.value)
        setLastNameWarning(false)
    }

    const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
        setEmailWarning(false)
    }

    const handleRole = (event: ChangeEvent<HTMLSelectElement>) => {
        switch (event.target.value) {
            case 'superAdmin':
                setRole('superAdmin')
                break
            case 'admin':
                setRole('admin')
                break
            case 'user':
                setRole('user')
                break
            default:
                setRole('user')
        }
    }

    const handleNumMuni = (event: ChangeEvent<HTMLInputElement>) => {
        const filterNumber = /[^0-9\s+]/g
        if (filterNumber.test(event.target.value) || event.target.value.length + 1 === 17) {
            return
        } else {
            setJobNumber(event.target.value)
        }
    }

    const handleAnexo = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 9) {
            setContactWarning(false)
            setContactNumber(event.target.value)
        }
    }

    const handleAnexoBlur = (event: ChangeEvent<HTMLInputElement>) => {
        const filterAnexo = /[^0-9]/g
        if (filterAnexo.test(event.target.value) || event.target.value.length + 1 === 11) {
            setContactWarning(false)
        } else if (event.target.value === '') {
            setContactWarning(true)
        } else {
            ''
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
            <button className="w-fit inline-flex items-center mt-10 ml-10 text-xs" title="Go back" onClick={onFinish}>
                <BiArrowBack size={24} />
            </button>
            <div className="max-w-6/12 mx-auto">
                <h1 className="text-center text-xl font-bold p-4">Add a new user</h1>
                    <form>
                    <div className="flex justify-center mt-7">
                        <section className="pr-9 max-w-fit">
                            <h2 className="text-xl font-medium pb-2 underline decoration-solid underline-offset-2">Personal Information</h2>

                            <label htmlFor="crearRut" className="block text-sm font-medium leading-6 text-gray-900">Identifier:</label>
                            <div className="mb-2">
                                <input id="crearRut"
                                    name="rut"
                                    type="text"
                                    required
                                    className={!identifierWarning ? "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" : "block w-full rounded-md border-0 py-1.5 text-red-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"}
                                    onChange={handleIdentifier}
                                    onBlur={event => event.target.value === '' ? setIdentifierWarning(true) : setIdentifierWarning(false)}
                                    value={newIdentifier}
                                    placeholder="12.345.678-9" 
                                />
                            </div>

                            <label htmlFor="crearNombres" className="block text-sm font-medium leading-6 text-gray-900">Names:</label>
                            <div className="mb-2">
                                <input id="crearNombres"
                                    name="nombres"
                                    type="text"
                                    required
                                    className={!nameWarning ? "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" : "block w-full rounded-md border-0 py-1.5 text-red-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"}
                                    onChange={handleName}
                                    onBlur={event => event.target.value === '' ? setNameWarning(true) : setNameWarning(false)}
                                    value={names}
                                    placeholder="Name(s)..."
                                />
                            </div>

                            <label htmlFor="crearApellidos" className="block text-sm font-medium leading-6 text-gray-900">Lastnames:</label>
                            <div className="mb-2">
                                <input
                                    id="crearApellidos"
                                    name="apellidos"
                                    type="text"
                                    required
                                    className={!lastNameWarning ? "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" : "block w-full rounded-md border-0 py-1.5 text-red-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"}
                                    onChange={handleLastname}
                                    onBlur={event => event.target.value === '' ? setLastNameWarning(true) : setLastNameWarning(false)}
                                    value={lastNames}
                                    placeholder="Lastname(s)..."
                                />
                            </div>

                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email:</label>
                            <div className="mb-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className={!emailWarning ? "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" : "block w-full rounded-md border-0 py-1.5 text-red-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"}
                                    onChange={handleEmail}
                                    onBlur={event => event.target.value === '' ? setEmailWarning(true) : setEmailWarning(false)}
                                    value={email}
                                    placeholder="example@email.com"
                                    />
                            </div>
                        </section>

                        <section className="pl-9 max-w-fit">
                            <h3 className="text-xl font-medium pb-2 underline decoration-solid underline-offset-2">Job Information</h3>

                            <label htmlFor="rol" className="block text-sm font-medium leading-6 text-gray-900">Role:</label>
                            <div className="mb-2">
                                <select
                                    id="rol"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleRole}
                                    value={role}
                                >
                                    <optgroup label="-- Seleccionar una opción">
                                        <option>user</option>
                                        <option>admin</option>
                                        <option>superAdmin</option>
                                    </optgroup>
                                </select>
                            </div>

                            <label htmlFor="dependencias" className="block text-sm font-medium leading-6 text-gray-900">Dependencies:</label>
                            <div className="mb-2">
                                <select
                                    id="dependencias"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={event => setDepartments(event.target.value)}
                                    value={''}
                                >
                                <optgroup label="-- Select an option">
                                    {
                                        initialData.dependencies.map((item, index) => {
                                            return <option key={`dependency${index}`}>{item.nombre}</option>
                                        })
                                    }
                                </optgroup>
                                </select>
                            </div>
                            
                            <label htmlFor="direcciones" className="block text-sm font-medium leading-6 text-gray-900">Directions:</label>
                            <div className="mb-2">
                                <select
                                    id="direcciones"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={event => setDirections(event.target.value)}
                                    value={directions}
                                >
                                <optgroup label="-- Select an option">
                                    {
                                        initialData.directions.map((item, index) => {
                                            return <option key={`dependency${index}`}>{item.direccion}</option>
                                        })
                                    }
                                </optgroup>
                                </select>
                            </div>

                            <label htmlFor="num-muni" className="block text-sm font-medium leading-6 text-gray-900">Job Number:</label>
                            <div className="mb-2">
                                <input
                                    id="num-muni"
                                    name="numeroMunicipal"
                                    type="text"
                                    required={false}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleNumMuni} placeholder="9 1111 1111" value={jobNumber}
                                />
                            </div>

                            <label htmlFor="anexo-muni" className="block text-sm font-medium leading-6 text-gray-900">Contact Number:</label>
                            <div className="mb-2">
                                <input
                                    id="anexo-muni"
                                    name="anexoMunicipal"
                                    type="text"
                                    required
                                    className={!contactWarning ? "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" : "block w-full rounded-md border-0 py-1.5 text-red-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"}
                                    onChange={handleAnexo}
                                    onBlur={handleAnexoBlur}
                                    placeholder="999999999"
                                    value={contactNumber} />
                            </div>
                        </section>
                    </div>
                    
                    <section className="flex flex-col justify-center items-center mt-7">
                        <label htmlFor="contraseña" className="block text-sm font-medium leading-6 text-gray-900">Enter a password:</label>
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
                                value="Save the user" />
                        </div>
                    </section>
                </form>

            </div>
        </div>
    )
}

export default CreateUser