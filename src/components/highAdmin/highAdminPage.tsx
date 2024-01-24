import GeneralTable from "../tables/adminTable/GeneralTable"
// import { BadgeComponent } from "./button/BadgeComponent"

const HighAdminPage = () => {
    return (
        <section className="bg-gradient-to-b from-white	to-slate-200 h-fit min-h-screen">
            <h1>Acceso administrativo</h1>
            {/* <p>Conectado como: </p>  */}
            <GeneralTable rol={'superAdmin'} />
            {/* <BadgeComponent />  */}
        </section>
    )
}

export default HighAdminPage