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

export default { toggleFilter }