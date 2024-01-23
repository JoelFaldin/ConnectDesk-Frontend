import axios from "axios"
const url = '/api/filter/'

const toggleFilter = async (column: string, order: string, pageSize: number, page: number) => {
    const request = await axios.get(`${url}`, {
        params: {
            column,
            order,
            pageSize,
            page
        }
    })
    const sorteredData = request
    return sorteredData.data
}

const searchFilter = async (column: string, value: string, pageSize: number, page: number) => {
    if (value === '') {
        return toggleFilter(column, 'normal', pageSize, page)
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