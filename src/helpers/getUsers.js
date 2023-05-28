import { headers } from '../utils/headers'
import { backUpLocalStorage } from './backUpLocalStorage'
import { setLocalStorage } from './setLocalStorage'

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
    const { _id, _name, _role, _urlImg, _token } = backUpLocalStorage()
    setLocalStorage(_id, _name, _role, _urlImg, _token)
    localStorage.setItem(type, JSON.stringify(data))
  } catch (error) {
    console.log('error: ', error)
  }
  return data
}
