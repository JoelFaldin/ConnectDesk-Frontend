import GeneralTable from "../tables/adminTable/GeneralTable"

const UserPage = () => {
    return (
        <div className="bg-gradient-to-b from-white to-slate-200 h-fit min-h-screen">
            <h2>User access</h2>
            <GeneralTable rol={"user"} />
        </div>
    )
}

export default UserPage