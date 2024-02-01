import GeneralTable from "../tables/adminTable/GeneralTable"
import dataService from '../../services/handleRequests'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

interface UserName {
    nombres: String
}

const UserPage = () => {
    const [userName, setUserName] = useState<UserName>()
    const navigate = useNavigate()
    const token = localStorage.getItem('jwt')

    const greetingsArray = ['Bienvenido', 'Buenas', 'Saludos']
    const greeting = greetingsArray[Math.floor(Math.random() * 3)]

    useEffect(() => {
        const getData = async () => {
            try {
                const user = await dataService.getUserData(token)
                setUserName(user.nombres)
                console.log(user.message)
            } catch(error: any) {
                console.log(error.response.data.error)
            }
        }
        getData()
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('jwt')
        navigate('/login')
    }

    return (
        <div className="bg-gradient-to-b from-white to-slate-200 h-fit min-h-screen">
            <h2 className="text-3xl font-bold text-gray-900 underline underline-offset-4 ml-24 mb-2">Conectado como usuario</h2>
            <h3 className="text-xl font-bold text-gray-900 ml-24">{greeting}, <i className="not-italic text-indigo-700">{userName?.nombres}</i></h3>
            <button
                className="block w-fit ml-24 mt-4 py-1.5 text-l text-center items-center rounded-md bg-indigo-200 px-2 font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 hover:cursor-pointer hover:ring-indigo-800 hover:bg-indigo-300"
                onClick={handleLogout}
            >
                <span>Cerrar sesión</span>
            </button>
            <GeneralTable rol={"user"} />
        </div>
    )
}

export default UserPage