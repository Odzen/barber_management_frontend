import { useEffect, useState } from 'react'
import CardUser from './components/CardUser'
import { Input } from 'antd'
import { headers } from '../../utils/headers'
import './users.css'
import './components/CardUser/style.scss'
import '../../style.scss'

const { Search } = Input

/* Component used to display each of the users */

const UsersView = () => {
  /* General states */
  const [data, setData] = useState(false)
  const [loading, setLoading] = useState(false)
  const [busqueda, setBusqueda] = useState({
    page: '',
    type: 'usuarios'
  })

  /* Global variables for requests */
  const API_URL = 'http://localhost:8080/'

  /*Elementos del DOM*/
  let elementos = document.querySelector('.displaying-num')
  let lista = document.querySelector('.lista')

  /*Función para obtener la data de todos los usuarios*/
  const getUsers = async (e) => {
    const requestOptions = {
      method: 'GET',
      headers: headers
    }

    try {
      const res = await fetch(API_URL + 'api/users', requestOptions)
      const data = await res.json()
      setLoading(true)
      setData(data.data)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  /*Función para hacer búsquedas de usuarios*/
  const onSearchUsers = async (value) => {
    if (value == '') {
      getUsers()
      setDataUser(false)
      setResult(true)
      lista.removeAttribute('style')
    }

    setBusqueda({
      search: value,
      page: 1
    })

    localStorage.setItem('search', value)

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        ...busqueda
      })
    }

    const ruta = urlBusqueda + value
    const res = await fetch(ruta, requestOptions)
    const data = await res.json()
    let busquedaArr = Object.values(data['result'])

    if (data['result'].length == 0) {
      setResult(false)
    }

    setDataUser(busquedaArr)
    setUser(false)
    lista.setAttribute('style', 'display:none')

    if (data['result'].length == 1) {
      elementos.innerHTML = `
        1 elemento
      `
    } else {
      elementos.innerHTML = `
      ${data['count']} elementos
    `
    }
  }

  /*Funciones que se ejecutarán cuando se renderice la página*/
  useEffect(() => {
    getUsers()
    // getRoles();
  }, [])

  return (
    <div className='contenedor_main'>
      <div className='container' style={{ overflowY: 'scroll', height: '87vh' }}>
        <div
          className='d-flex justify-content-between align-items-center mb-3'
          style={{ margin: '10px 20px' }}
        >
          <h1 className='_title'>Usuarios</h1>
          <Search
            placeholder='input search text'
            onSearch={onSearchUsers}
            style={{
              width: 200
            }}
            enterButton
          />
        </div>

        {!data
          ? ''
          : data.map(({ id, name, urlImg, phone, email, state, role }) => {
              return (
                <CardUser
                  key={id}
                  id={id}
                  name={name}
                  urlImg={urlImg}
                  email={email}
                  phone={phone}
                  state={state}
                  role={role}
                />
              )
            })}
      </div>
    </div>
  )
}

export default UsersView
