import { headers } from '../utils/headers'

const API_URL = import.meta.env.VITE_API_URL

export const getUser = async (id) => {
  const requestOptions = {
    method: 'GET',
    headers: headers
  }

  try {
    const res = await fetch(API_URL + 'api/users/' + id, requestOptions)
    let data = await res.json()
    delete data['updatedAt']
    delete data['createdAt']

    return data
  } catch (error) {
    console.log('error: ', error)
  }
}
