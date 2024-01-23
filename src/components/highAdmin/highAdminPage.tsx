import { useNavigate } from "react-router-dom"
// import './adminTable.css'
import GeneralTable from "../tables/adminTable/GeneralTable"

const HighAdminPage = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/createUser')
    }
    
    return (
        <section className="bg-gradient-to-b from-white	to-slate-200 h-fit min-h-screen">
            <h1>Acceso administrativo</h1>
            {/* <p>Conectado como: </p>  */}
            <button onClick={handleClick} id="newUser">Crear nuevo usuario</button>
            <GeneralTable rol={'superAdmin'} />
        </section>
    )
}

export default HighAdminPage