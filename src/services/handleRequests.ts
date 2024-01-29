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

const getUsers = async (pageSize: number, page: number) => {
        const request = axios.get(`${url}`, {
        params: {
            page,
            pageSize
        }
    })
    const employee = await request
    return employee.data
}

const verify = async (rut: string, password: string): Promise<any> => {
    const request = axios.post('/api/verifyLogin', { rut, password })
    const res = await request  
    return res.data
}

const createUser = async (object: userModel, jwt: any) => {
    const request = axios.post('/api/newUser', object, { headers: { Authorization: `Bearer ${jwt}` } })
    const res = await request
    return res.data
}

const updateUser = async (rut: string, column: string, value: unknown, jwt: any) => {
    console.log(rut, column, value, jwt)
    const request = axios.put(`/api/update/${rut}`, { column, value }, { headers: { Authorization: `Bearer ${jwt}` } })
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

const createDependency = async (nombre: string, direccion: string, jwt: any) => {
    const request = axios.post('/api/newDependency', { nombre, direccion }, { headers: { Authorization: `Bearer ${jwt}` } })
    const res = await request
    return res.data
}

export default { getUsers, verify, createUser, updateUser, deleteUser, makeAdmin, getDependencies, createDependency }