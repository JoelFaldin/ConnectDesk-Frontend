// import NormalTable from "../tables/NormalTable"
import AdminTable from '../tables/adminTable/GeneralTable'
import './adminComponent.css'

const AdminComponent = () => {
    return (
        <>
            <h2>Conectado como administrador</h2>
            {/* This table will be able to be edited */}
            {/* Normal Admin */}
            <AdminTable rol={'admin'} />

        </>
    )
}

export default AdminComponent