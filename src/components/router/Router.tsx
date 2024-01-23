import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "../login/Login"
import './router.css'
import AdminPage from "../admin/AdminPage"
import CreateUser from "../highAdmin/createUser/createUser"
import HighAdminPage from "../highAdmin/highAdminPage"
import UserPage from "../user/UserPage"

const RouterComponent = () => {
    return (
        <div className="router">
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/data/superadmin" element={<HighAdminPage />} />
                    <Route path="/data/admin" element={<AdminPage />} />
                    <Route path="/data/user" element={<UserPage />} />
                    <Route path="/createUser" element={<CreateUser />} />
                </Routes>
            </Router>
        </div>
    )
}

export default RouterComponent