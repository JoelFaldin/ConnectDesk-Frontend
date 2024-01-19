import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "../login/Login"
import './router.css'
import AdminTable from "../admin/AdminComponent"
import UserTable from "../user/UserTable"
import CreateUser from "../highAdmin/createUser/createUser"
import HighAdmin from "../highAdmin/highAdmin"

const RouterComponent = () => {
    return (
        <div className="router">
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/data/superadmin" element={<HighAdmin />} />
                    <Route path="/data/admin" element={<AdminTable />} />
                    <Route path="/data/user" element={<UserTable />} />
                    <Route path="/createUser" element={<CreateUser />} />
                </Routes>
            </Router>
        </div>
    )
}

export default RouterComponent