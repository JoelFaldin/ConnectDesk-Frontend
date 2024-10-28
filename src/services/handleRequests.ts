import axios from "axios"

interface userModel {
    rut: String,
    names: String,
    lastNames: String,
    email: String,
    password: String,
    role: String,
    departments: String,
    directions: String,
    jobNumber: String,
    contact: String
}

const baseUrl = ''

const getUsers = async (searchValue: string, searchColumn: string, pageSize: number, page: number, jwt: string | null) => {
    const req = axios.get(`${baseUrl}/api/users`, {
        params: {
            searchValue,
            searchColumn,
            page,
            pageSize,
        },
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    })
    const res = await req
    return res.data
}

const getUserData = async (id: string, jwt: string | null) => {
    const request = axios.get(`${baseUrl}/api/users/${id}`, { headers: { Authorization: `Bearer ${jwt}` } })
    const res = await request
    return res.data
}

const getFilteredUsers = async (column: string, order: string, pageSize: number, page: number, jwt: string | null) => {
    let sendOrder = 0
    if (order === 'asc') {
        sendOrder = 1
    } else if (order === 'desc') {
        sendOrder = -1
    } else if (order === 'normal') {
        sendOrder = 0
    }

    const request = axios.get(`${baseUrl}/api/users/filter`, {
        params: {
            column,
            sendOrder,
            page,
            pageSize,
        },
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    })
    const res = await request
    return res.data
}

const verify = async (identifier: string, password: string): Promise<any> => {
    const request = axios.post(`${baseUrl}/api/auth`, { identifier, password })
    const res = await request
    return res.data
}

const recoverPassword = async (rut: string, email: string) => {
    const request = axios.post(`${baseUrl}/api/auth/password`, { rut, email })
    const res = await request
    return res.data
}

const validateToken = async (token: string | null) => {
    const request = axios.post(`${baseUrl}/api/auth/validate`, { token })
    const res = await request
    return res.data
}

const restorePasword = async (newPassword: string, token: string | null) => {
    console.log(newPassword, token)
    const request = axios.patch(`${baseUrl}/api/auth/restore`, { newPassword, token })
    const res = await request
    return res.data
}

const logout = async (jwt: string | null) => {
    const request = axios.post(`${baseUrl}/api/auth/logout`, null, { headers: { Authorization: `Bearer ${jwt}` } })
    const res = await request
    return res.data
}

const createUser = async (object: userModel, jwt: string | null) => {
    const request = axios.post(`${baseUrl}/api/users/`, object, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    })
    const res = await request
    return res.data
}

const updateUser = async (values: object, pageSize: number, page: number, jwt: string | null) => {
    const request = axios.patch(`${baseUrl}/api/users/`, { values, pageSize, page }, { headers: { Authorization: `Bearer ${jwt}` } })
    const res = await request
    return res.data
}

const deleteUser = async (identifier: string, jwt: string | null) => {
    const request = axios.delete(`${baseUrl}/api/users/${identifier}`, { headers: { Authorization: `Bearer ${jwt}` } })
    const res = await request
    return res.data
}

const makeAdmin = async (identifier: string, jwt: string | null) => {
    const request = axios.patch(`${baseUrl}/api/users/role/${identifier}`, null, { headers: { Authorization: `Bearer ${jwt}` } } )
    const res = await request
    return res.data
}

const getDepartments = async (jwt: string | null) => {
    const request = axios.get(`${baseUrl}/api/departments`, { headers: { Authorization: `Bearer ${jwt}` } })
    const res = await request
    return res.data
}

const createDepartment = async (name: string, jwt: string | null) => {
    const request = axios.post(`${baseUrl}/api/departments`, { name }, { headers: { Authorization: `Bearer ${jwt}` } })
    const res = await request
    return res.data
}

const deleteDepartment = async (id: string, jwt: string | null) => {
    const request = axios.delete(`${baseUrl}/api/departments/${id}`, { headers: { Authorization: `Bearer ${jwt}` } })
    const res = await request
    return res.data
}

const updateDepartment = async (name: string | null, id: string, jwt: string | null) => {
    const request = axios.patch(`${baseUrl}/api/departments/${id}`, { name }, { headers: { Authorization: `Bearer ${jwt}` } })
    const res = await request
    return res.data
}

const getDirections = async (jwt: string | null) => {
    const request = axios.get(`${baseUrl}/api/directions`, { headers: { Authorization: `Bearer ${jwt}` } })
    const res = await request
    return res.data
}

const createDirection = async (name: string, address: string, jwt: string | null) => {
    const request = axios.post(`${baseUrl}/api/directions`, { name, address }, { headers: { Authorization: `Bearer ${jwt}` } })
    const res = await request
    return res.data
}

const deleteDirection = async (id: string, jwt: string | null) => {
    const request = axios.delete(`${baseUrl}/api/directions/${id}`, { headers: { Authorization: `Bearer ${jwt}` } })
    const res = await request
    return res.data
}

const updateDirection = async (name: string | null, address: string | null, id: string, jwt: string | null) => {
    const request = axios.patch(`${baseUrl}/api/directions/${id}`, { name, address }, { headers: { Authorization: `Bearer ${jwt}` } })
    const res = await request
    return res.data
}

const uploadExcel = async (excel: File | null | undefined, jwt: string | null) => {
    try {
        const formData = new FormData()
        formData.append('excelFile', excel as Blob)
    
        const request = axios.post(`${baseUrl}/api/excel/upload/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${jwt}`
            }
        })
    
        const res = await request
        return res.data
    } catch (error) {
        console.log(error)
    }
}

const downloadExcel = async (users: number | string, page: number, jwt: string | null) => {
    try {
        
        const getExcel = await axios.get(`${baseUrl}/api/excel/download`, {
            params: {
                users,
                page,
                jwt
            },
            headers: {
                Authorization: `Bearer ${jwt}`
            },
            responseType: 'blob'
        })
    
        const blob = new Blob([getExcel.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        
        const anchor = document.createElement('a')
        anchor.href = window.URL.createObjectURL(blob)
        anchor.download = 'userdata.xlsx'
        document.body.appendChild(anchor)
        anchor.click()
        document.body.removeChild(anchor)
    
        const res = getExcel
        return res.data
    } catch (error) {
        console.log(error)
    }
}

const downloadTemplate = async (jwt: string | null) => {
    const getTemplate = await axios.get(`${baseUrl}/api/excel/template`, {
        responseType: 'blob',
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    })
    const blob = new Blob([getTemplate.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    
    const anchor = document.createElement('a')
    anchor.href = window.URL.createObjectURL(blob)
    anchor.download = 'template.xlsx'
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)

    const res = getTemplate
    return res.data
}

export default {
    getUsers,
    getUserData,
    getFilteredUsers,
    verify,
    recoverPassword,
    validateToken,
    restorePasword,
    logout,
    createUser,
    updateUser, 
    deleteUser,
    makeAdmin,
    getDepartments,
    createDepartment,
    deleteDepartment,
    updateDepartment,
    getDirections,
    createDirection,
    deleteDirection,
    updateDirection,
    uploadExcel,
    downloadExcel,
    downloadTemplate,
}