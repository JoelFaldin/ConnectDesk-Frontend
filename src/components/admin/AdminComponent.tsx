// import NormalTable from "../tables/NormalTable"
import GeneralTable from '../tables/adminTable/GeneralTable'
import './adminComponent.css'

const AdminComponent = () => {
    return (
        <>
            <h2>Conectado como administrador</h2>
            {/* This table will be able to be edited */}
            {/* Normal Admin */}
            <GeneralTable rol={'admin'} />

        </>
    )
}

export default AdminComponent