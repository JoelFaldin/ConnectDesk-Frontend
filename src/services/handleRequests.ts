import axios from "axios";
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
    const request = axios.post('/api/verify', { rut, password })
    const res = await request
    return res.data
}

const createUser = async (object: userModel) => {
    const request = axios.post('/api/newUser', object)
    const res = await request
    return res.data
}

const updateUser = async (rut: string, column: string, value: unknown, rol: string) => {
    const request = axios.put(`/api/update/${rut}`, { column, value, rol })
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

export default { getUsers, verify, createUser, updateUser, deleteUser, makeAdmin }