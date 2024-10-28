import { useState, useEffect } from 'react'
import GeneralTable from '../tables/adminTable/GeneralTable'
import dataService from '../../services/handleRequests'

const HighAdminPage = () => {
    // States to handle the behaviour of the component:
    const [userName, setUserName] = useState('')
    const token = localStorage.getItem('jwt')

    useEffect(() => {
        const getData = async () => {
            try {
                const identifier = localStorage.getItem('rut')

                if (identifier) {
                    const user = await dataService.getUserData(identifier, token)
                    setUserName(user.nombres)
                } else {
                    alert('Log in again')
                }
            } catch(error: any) {
                console.log(error.response.data.error)
            }
        }
    
        if (!userName) {
            getData()
        }
    }, [])

    // Checking if theres an user already logged in:
    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            setUserName(user.nombres)
        }
    }, [])
    
    return (
        <section className="bg-gradient-to-b from-white	to-slate-200 min-h-dvh w-fit min-w-full pt-20">
            <GeneralTable rol={'SUPERADMIN'} />
        </section>
    )
}

export default HighAdminPage