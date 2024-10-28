import axios from "axios"
const baseUrl = ''

const toggleFilter = async (column: string, order: string, searchValue: string, searchColumn: string, pageSize: number, page: number, jwt: string | null) => {
    try {
        const request = await axios.get(`${baseUrl}/api/users/order`, {
            params: {
                column,
                order,
                searchValue,
                searchColumn: searchValue ? searchColumn : '',
                pageSize,
                page
            },
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        const sorteredData = request
        return sorteredData.data
    } catch (error) {
        console.log(error)
    }
}

export default { toggleFilter }