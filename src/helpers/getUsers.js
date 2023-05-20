import { headers } from "../utils/headers"
const API_URL = import.meta.env.VITE_API_URL

/* Function to obtain the data of all barbers */
export const getUsers = async (role, type, setData, setLoading) => {
    let data = []
    const requestOptions = {
        method: 'GET',
        headers: headers
    }

    try {
        const res = await fetch(API_URL + 'api/users', requestOptions)
        let data = await res.json()
        data = data.data.filter((user) => user.role === role)
        setLoading(true)
        setData(data)
        localStorage.setItem(type, JSON.stringify(data))
    } catch (error) {
        console.log('error: ', error)
    }
    return data

}
