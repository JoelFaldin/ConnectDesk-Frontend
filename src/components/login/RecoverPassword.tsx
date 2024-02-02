import { ChangeEvent, useState } from "react"
import rutFormater from "../../services/rutFormater"
import dataService from '../../services/handleRequests'

const recoverPassword = () => {
    const [rut, setRut] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleRut = (event: ChangeEvent<HTMLInputElement>) => {        
        if (rutFormater(event.target.value)) {
            setRut(event.target.value)
        } else {
            return
        }
    }

    const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setEmail(event.target.value)
    }

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        try {
            await dataService.recoverPassword(rut, email)
            // setMessage(request)
        } catch(error: any) {
            console.error(error.response.data.error)
        }
    }

    return (
        <div className="flex">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Recobrar contraseña
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="rut" className="block text-sm font-medium leading-6 text-gray-900">
                                Rut
                            </label>
                            <div className="mt-2">
                                <input
                                id="rut"
                                name="rut"
                                type="rut"
                                autoComplete="rut"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                placeholder="Ingrese su rut..."
                                value={rut}
                                onChange={handleRut}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Correo:
                                </label>
                            </div>
                            <div className="mt-2">
                                    <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="current-email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Ingrese su correo electrónico..."
                                    onChange={handleEmail}
                                    />
                            </div>
                        </div>

                        <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleSubmit}
                        >
                            Enviar
                        </button>
                    </form>
                    {
                        message === ''
                            ? ''
                            : (
                                <p className="text-cyan-500">{message}</p>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default recoverPassword