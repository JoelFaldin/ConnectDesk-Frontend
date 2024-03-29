import GeneralTable from "../tables/adminTable/GeneralTable"
import dataService from '../../services/handleRequests'
import { useState, useEffect } from 'react'

const UserPage = () => {
    // States to handle the behaviour of the component:
    const [userName, setUserName] = useState('')
    const token = localStorage.getItem('jwt')

    useEffect(() => {
        const getData = async () => {
            try {
                const user = await dataService.getUserData(token)
                setUserName(user.nombres)
            } catch(error: any) {
                console.log(error.response.data.error)
            }
        }

        if (!userName) {
            getData()
        }
    }, [])

    // Checking if an user is already logged in:
    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            setUserName(user.nombres)
        }
    }, [])

    return (
        <div className="bg-gradient-to-b from-white to-slate-200 h-fit min-h-screen pt-20">
            <GeneralTable rol={"user"} />
        </div>
    )
}

export default UserPage