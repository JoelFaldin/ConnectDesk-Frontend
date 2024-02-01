import axios from "axios"
const url = '/api/data'

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

const getUsers = async (searchValue: string, searchColumn: string, pageSize: number, page: number) => {
    const request = axios.get(`${url}`, {
        params: {
            searchValue,
            searchColumn,
            pageSize,
            page
        }
    })
    const res = await request
    return res.data
}

const getFilteredUsers = async (column: string, order: string, searchValue: string, searchColumn: string, pageSize: number, page: number) => {
    console.log('test')
    let sendOrder = ''
    if (order === 'asc') {
        sendOrder = 'desc'
    } else if (order === 'desc') {
        sendOrder = 'normal'
    } else if (order === 'normal') {
        sendOrder = 'asc'
    }

    const request = axios.get(`/api/filterUsers/`, {
        params: {
            column,
            sendOrder,
            searchValue,
            searchColumn,
            pageSize,
            page
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

const createUser = async (object: userModel, jwt: string | null) => {
    const request = axios.post('/api/newUser', object, { headers: { Authorization: `Bearer ${jwt}` } })
    const res = await request
    return res.data
}

const updateUser = async (values: object, pageSize: number, page: number, jwt: string | null) => {
    console.log(values, pageSize, jwt)
    const request = axios.put(`/api/update/`, { values, pageSize, page }, { headers: { Authorization: `Bearer ${jwt}` } })
    const res = await request
    return res.data
}

const deleteUser = async (rut: string) => {
    const request = axios.delete(`/api/delete/${rut}`)
    const res = await request
    return res.data
}

const makeAdmin = async (rut: string) => {
    const request = axios.put(`/api/newAdmin/${rut}`)
    const res = await request
    return res.data
}

const getDependencies = async () => {
    const request = axios.get('/api/dependencies')
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

const downloadTemplate = async () => {
    const getTemplate = await axios.get('/api/template', {
        responseType: 'blob'
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
    getFilteredUsers,
    verify,
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
    downloadTemplate
}