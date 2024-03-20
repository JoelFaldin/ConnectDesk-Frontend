import GeneralTable from '../tables/adminTable/GeneralTable'
import dataService from '../../services/handleRequests'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminPage = () => {
    // States to handle the component's behaviour:
    const [userName, setUserName] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const token = localStorage.getItem('jwt')

    const greetingsArray = ['Welcome', 'Greetings']
    const greeting = greetingsArray[Math.floor(Math.random() * 2)]

    useEffect(() => {
        const getData = async () => {
            try {
                const user = await dataService.getUserData(token)
                setUserName(user.nombres)
            } catch(error: any) {
                console.log(error.response.data.error)
            }
        }
        getData()
    }, [])

    // Checking if there's an user already logged in:
    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            setUserName(user.nombres)
        }
    }, [])

    // Funtion to handle the logout:
    const handleLogout = async () => {
        setLoading(true)
        try {
            await dataService.logout(token)
            localStorage.clear()
            navigate('/')
        } catch(error: any) {
            console.log(error.response.data.error)
        }
        setLoading(false)
    }

    return (
        <div className='bg-gradient-to-b from-white to-slate-200 min-h-dvh w-fit min-w-full'>
            <h2 className="text-3xl font-bold text-gray-900 underline underline-offset-4 ml-24 mb-2">Conected as admin</h2>
            <h3 className="text-xl font-bold text-gray-900 ml-24">{greeting}, <i className="not-italic text-indigo-700">{userName}</i></h3>
            <button
                className={!loading ? "block w-fit ml-24 mt-4 py-1.5 text-l text-center items-center rounded-md bg-indigo-200 px-2 font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 hover:cursor-pointer hover:ring-indigo-800 hover:bg-indigo-300" : "block w-fit ml-24 mt-4 py-1.5 text-l text-center items-center rounded-md bg-gray-200 px-2 font-medium text-black ring-1 ring-inset ring-gray-700/10"}
                onClick={handleLogout}
                disabled={loading}
            >
                <span>Log out</span>
            </button>
            {
                loading ? <p className="ml-24">Loggin out...</p> : ''
            }
            <GeneralTable rol={'admin'} />
        </div>
    )
}

export default AdminPage