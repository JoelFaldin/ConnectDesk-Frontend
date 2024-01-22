import axios from "axios"
const url = '/api/filter'

const toggleFilter = async (column: string, order: string) => {
    const request = await axios.get(`${url}`, {
        params: {
            column,
            order
        }
    })
    const sorteredData = request
    return sorteredData.data
}

export default { toggleFilter }