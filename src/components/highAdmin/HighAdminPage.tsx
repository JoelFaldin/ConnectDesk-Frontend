import GeneralTable from "../tables/adminTable/GeneralTable"

const HighAdminPage = () => {
    
    return (
        <section className="bg-gradient-to-b from-white	to-slate-200 min-h-dvh w-fit min-w-full">
            <h1>Acceso administrativo</h1>
            {/* <p>Conectado como: </p>  */}
            <GeneralTable rol={'superAdmin'} />
        </section>
    )
}

export default HighAdminPage