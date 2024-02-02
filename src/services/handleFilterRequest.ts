import axios from "axios"
const url = '/api/filter/'

const toggleFilter = async (column: string, order: string, searchValue: string, searchColumn: string, pageSize: number, page: number, jwt: string | null) => {
    const request = await axios.get(`${url}`, {
        params: {
            column,
            order,
            searchValue,
            searchColumn,
            pageSize,
            page
        },
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    })
    const sorteredData = request
    return sorteredData.data
}

const searchFilter = async (column: string, value: string, pageSize: number, page: number, jwt: string | null) => {
    if (value === '') {
        return toggleFilter(column, 'normal', '', '',  pageSize, page, jwt)
    }
    
    const request = await axios.get(`${url}/search/`, {
        params: {
            column,
            value,
            pageSize,
            page
        }
    })
    const sorteredData = request
    return sorteredData.data
}

export default { toggleFilter, searchFilter }