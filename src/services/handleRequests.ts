import axios from "axios"

interface userModel {
    rut: string,
    nombres: string,
    apellidos: string,
    email: string,
    passHash: string,
    rol: string,
    dependencias: string,
    direcciones: string,
    numMunicipal: string,
    anexoMunicipal: string
}

const getUsers = async (searchValue: string, searchColumn: string, pageSize: number, page: number, jwt: string | null) => {
    const req = axios.get('/api/newData', {
        params: {
            searchValue,
            searchColumn,
            pageSize,
            page
        },
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    })
    const res = await req
    return res.data
}

const getUserData = async (jwt: string | null) => {
    const request = axios.get('/api/getUserData', { headers: { Authorization: `Bearer ${jwt}` } })
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

    const request = axios.get(`/api/filterUsers/`, {
        params: {
            column,
            sendOrder,
            pageSize,
            page
        },
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    })
    const res = await request
    return res.data
}

const verify = async (rut: string, password: string): Promise<any> => {
    const request = axios.post('/api/verifyLogin', { rut, password })
    const res = await request  
    return res.data
}

const logout = async (jwt: string | null) => {
    const request = axios.post('/api/logout', null, { headers: { Authorization: `Bearer ${jwt}` } })
    const res = await request
    return res.data
}

const createUser = async (object: userModel, jwt: string | null) => {
    const request = axios.post('/api/newUser', object, { headers: { Authorization: `Bearer ${jwt}` } })
    const res = await request
    return res.data
}

const updateUser = async (values: object, pageSize: number, page: number, jwt: string | null) => {
    const request = axios.put(`/api/update/`, { values, pageSize, page }, { headers: { Authorization: `Bearer ${jwt}` } })
    const res = await request
    return res.data
}

const deleteUser = async (rut: string, jwt: string | null) => {
    const request = axios.delete(`/api/delete/${rut}`, { headers: { Authorization: `Bearer ${jwt}` } })
    const res = await request
    return res.data
}

const makeAdmin = async (rut: string, jwt: string | null) => {
    const request = axios.put(`/api/newAdmin/${rut}`, null, { headers: { Authorization: `Bearer ${jwt}` } } )
    const res = await request
    return res.data
}

const getDependencies = async (jwt: string | null) => {
    const request = axios.get('/api/getDependencies', { headers: { Authorization: `Bearer ${jwt}` } })
    const res = await request
    return res.data
}

const createDependency = async (nombre: string, direccion: string, jwt: string | null) => {
    const request = axios.post('/api/newDependency', { nombre, direccion }, { headers: { Authorization: `Bearer ${jwt}` } })
    const res = await request
    return res.data
}

const deleteDependency = async (index: number, jwt: string | null) => {
    const request = axios.delete(`/api/deleteDependency/${index}`, { headers: { Authorization: `Bearer ${jwt}` } })
    const res = await request
    return res.data
}

const updateDependency = async (newName: string | null, newDirection: string | null, index: number, jwt: string | null) => {
    const request = axios.put(`/api/updateDependency/${index}`, { newName, newDirection }, { headers: { Authorization: `Bearer ${jwt}` } })
    const res = await request
    return res.data
}

const uploadExcel = async (excel: File | null | undefined, jwt: string | null) => {
    const formData = new FormData()
    formData.append('excelFile', excel as Blob)

    const request = axios.post('/api/uploadExcel', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${jwt}`
        }
    })

    const res = await request
    return res.data
}

const downloadExcel = async (users: number | string, page: number, jwt: string | null) => {
    const getExcel = await axios.get('/api/download', {
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
}

const downloadTemplate = async (jwt: string | null) => {
    const getTemplate = await axios.get('/api/template', {
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

const recoverPassword = async (rut: string, email: string) => {
    await axios.post('/getPassword', {
        rut,
        email
    })
    // const res = await request
    // return res.data
}

export default {
    getUsers,
    getUserData,
    getFilteredUsers,
    verify,
    logout,
    createUser,
    updateUser, 
    deleteUser,
    makeAdmin,
    getDependencies,
    createDependency,
    deleteDependency,
    updateDependency,
    uploadExcel,
    downloadExcel,
    downloadTemplate,
    recoverPassword
}