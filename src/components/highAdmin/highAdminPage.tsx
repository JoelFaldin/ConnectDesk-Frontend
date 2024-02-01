import { useState, useEffect } from 'react'
import GeneralTable from '../tables/adminTable/GeneralTable'
import dataService from '../../services/handleRequests'

interface UserName {
    nombres: String
}

const HighAdminPage = () => {
    const [userName, setUserName] = useState<UserName>()
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
    
    return (
        <section className="bg-gradient-to-b from-white	to-slate-200 min-h-dvh w-fit min-w-full">
            <h2 className="text-3xl font-bold text-gray-900 underline underline-offset-4 ml-24 mb-2">Conectado como administrador</h2>
            <h3 className="text-xl font-bold text-gray-900 ml-24">{greeting}, <i className="not-italic text-indigo-700">{userName?.nombres}</i></h3>
            {/* <p>Conectado como: </p>  */}
            <GeneralTable rol={'superAdmin'} />
        </section>
    )
}

export default HighAdminPage