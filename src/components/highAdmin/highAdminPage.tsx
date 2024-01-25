import GeneralTable from "../tables/adminTable/GeneralTable"
import { BiSolidUserPlus } from "react-icons/bi";

const HighAdminPage = () => {
    const handleNewUser = () => {
        console.log('test')
    }
    
    return (
        <section className="bg-gradient-to-b from-white	to-slate-200 min-h-dvh w-fit min-w-full">
            <h1>Acceso administrativo</h1>
            {/* <p>Conectado como: </p>  */}
            <GeneralTable rol={'superAdmin'} />
            <button className="mt-auto ml-auto mr-64 mb-4 flex gap-2 rounded-md bg-green-50 px-2 py-1 ring-1 ring-inset ring-green-600/20" onClick={handleNewUser}>
                <BiSolidUserPlus className="text-green-700" size={24} />
                <span className="text-base text-green-700">Crear nuevo usuario</span>
            </button>
        </section>
    )
}

export default HighAdminPage