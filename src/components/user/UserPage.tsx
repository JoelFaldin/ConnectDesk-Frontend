import GeneralTable from "../tables/adminTable/GeneralTable"
import dataService from '../../services/handleRequests'
import { useState, useEffect } from 'react'

interface UserName {
    nombres: String
}

const UserPage = () => {
    const [userName, setUserName] = useState<UserName>()
    const token = localStorage.getItem('jwt')

    const greetingsArray = ['Bienvenido', 'Buenas', 'Saludos']
    const greeting = greetingsArray[Math.floor(Math.random() * 3)]

    useEffect(() => {
        const getData = async () => {
            try {
                const user = await dataService.getUserData(token)
                setUserName(user)     
                console.log(user)
            } catch(error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    return (
        <div className="bg-gradient-to-b from-white to-slate-200 h-fit min-h-screen">
            <h2 className="text-3xl font-bold text-gray-900 underline underline-offset-4 ml-24 mb-2">Conectado como usuario</h2>
            <h3 className="text-xl font-bold text-gray-900 ml-24">{greeting}, <i className="not-italic text-indigo-700">{userName?.nombres}</i></h3>            <GeneralTable rol={"user"} />
        </div>
    )
}

export default UserPage