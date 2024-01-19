import { useNavigate } from "react-router-dom"
import AdminTable from '../tables/adminTable/GeneralTable'
import './adminTable.css'

const HighAdmin = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/createUser')
    }
    
    return (
        <section className="highAdminComponent">
            <h1 className="highAdmin-title">Acceso administrativo</h1>
            {/* <p>Conectado como: </p>  */}
            <button onClick={handleClick} id="newUser">Crear nuevo usuario</button>
            <AdminTable rol={'superAdmin'} />
        </section>
    )
}

export default HighAdmin