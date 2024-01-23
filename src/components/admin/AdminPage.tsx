import GeneralTable from '../tables/adminTable/GeneralTable'

const AdminPage = () => {
    return (
        <>
            <h2>Conectado como administrador</h2>
            {/* Normal Admin */}
            <GeneralTable rol={'admin'} />
        </>
    )
}

export default AdminPage