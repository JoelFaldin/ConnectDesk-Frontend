import GeneralTable from "../tables/adminTable/GeneralTable"

const UserPage = () => {
    return (
        <>
            <h2>User access</h2>
            <GeneralTable rol={"user"} />
        </>
    )
}

export default UserPage