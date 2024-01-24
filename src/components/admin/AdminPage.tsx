import GeneralTable from '../tables/adminTable/GeneralTable'

const AdminPage = () => {
    return (
        <div  className='bg-gradient-to-b from-white to-slate-200 h-fit min-h-screen'>
            <h2>Conectado como administrador</h2>
            {/* Normal Admin */}
            <GeneralTable rol={'admin'} />
        </div>
    )
}

export default AdminPage