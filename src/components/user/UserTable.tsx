import AdminTable from "../tables/adminTable/GeneralTable"

const UserTable = () => {
    return (
        <>
            <h2>User access</h2>
            <AdminTable rol={"user"} />
        </>
    )
}

export default UserTable