import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "../login/Login"
import AdminPage from "../admin/AdminPage"
import CreateUser from "../highAdmin/handleUser/createUser"
import HighAdminPage from "../highAdmin/highAdminPage"
import UserPage from "../user/UserPage"
import RecoverPassword from "../login/RecoverPassword"
import NewPassword from "../login/NewPassword"

// Route definition:
const RouterComponent = () => {
    const test = () => {
    }

    return (
        <div className="router">
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/newPassword" element={<NewPassword />} />
                    <Route path="/recoverPassword" element={<RecoverPassword />} />
                    <Route path="/data/superadmin" element={<HighAdminPage />} />
                    <Route path="/data/admin" element={<AdminPage />} />
                    <Route path="/data/user" element={<UserPage />} />
                    <Route path="/createUser" element={<CreateUser onFinish={test} initialDependencies={[]} rerenderDependency={test} initialDirections={[]} />} />
                </Routes>
            </Router>
        </div>
    )
}

export default RouterComponent