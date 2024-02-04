import GeneralTable from '../tables/adminTable/GeneralTable'
import dataService from '../../services/handleRequests'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminPage = () => {
    // Estados para manejar el comportamiento del componente:
    const [userName, setUserName] = useState('')
    const navigate = useNavigate()
    const token = localStorage.getItem('jwt')

    const greetingsArray = ['Bienvenido', 'Buenas', 'Saludos']
    const greeting = greetingsArray[Math.floor(Math.random() * 3)]

    useEffect(() => {
        const getData = async () => {
            try {
                const user = await dataService.getUserData(token)
                setUserName(user.nombres)
                // console.log(user.message)
            } catch(error: any) {
                console.log(error.response.data.error)
            }
        }
        getData()
    }, [])

    // Revisando si hay un usuario loggeado:
    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            setUserName(user.nombres)
        }
    }, [])

    // Función para manejar el logout:
    const handleLogout = async () => {
        try {
            await dataService.logout(token)
            // console.log(logout.message)
            localStorage.clear()
            navigate('/login')
        } catch(error: any) {
            console.log(error.response.data.error)
        }
    }

    return (
        <div className='bg-gradient-to-b from-white to-slate-200 min-h-dvh w-fit min-w-full'>
            <h2 className="text-3xl font-bold text-gray-900 underline underline-offset-4 ml-24 mb-2">Conectado como admin</h2>
            <h3 className="text-xl font-bold text-gray-900 ml-24">{greeting}, <i className="not-italic text-indigo-700">{userName}</i></h3>
            <button
                className="block w-fit ml-24 mt-4 py-1.5 text-l text-center items-center rounded-md bg-indigo-200 px-2 font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 hover:cursor-pointer hover:ring-indigo-800 hover:bg-indigo-300"
                onClick={handleLogout}
            >
                <span>Cerrar sesión</span>
            </button>
            <GeneralTable rol={'admin'} />
        </div>
    )
}

export default AdminPage