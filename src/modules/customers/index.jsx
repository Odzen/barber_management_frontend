import { useEffect, useState } from 'react'
import { Input, Spin, Empty } from 'antd'
import { headers } from '../../utils/headers'
import { ROLES } from '../../utils/enums'
import { onSearch } from '../../helpers/onSearch'
import CustomerCard from './components/CustomerCard'
import '../../style.scss'
import './style.scss'

/* Component used to display each of the customer */

const CustomersView = () => {
  /* General states */
  const [data, setData] = useState(false)
  const [loading, setLoading] = useState(false)
  const type = 'customers'

  /* Global variables for requests */
  const API_URL = import.meta.env.VITE_API_URL

  /* Function to obtain the data of all customers */
  const getUsers = async () => {
    const requestOptions = {
      method: 'GET',
      headers: headers
    }

    try {
      const res = await fetch(API_URL + 'api/users', requestOptions)
      let data = await res.json()
      data = data.data.filter((user) => user.role === ROLES.CUSTOMER)
      setLoading(true)
      setData(data)
      localStorage.setItem(type, JSON.stringify(data))
    } catch (error) {
      console.log('error: ', error)
    }

    return data
  }

  /* Functions to be executed when the page is rendered */
  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='contenedor_main'>
      <div className='container'>
        <div
          className='d-flex justify-content-between align-items-center mb-3'
          style={{ margin: '10px 20px' }}
        >
          <h1 className='_title'>Clientes</h1>
          <Input
            placeholder='Buscar...'
            onChange={(event) => onSearch(event, setData)}
            style={{
              width: 400
            }}
          />
        </div>

        <div className='titles'>
          <div className='field'>
            <div className='d-flex align-items-center justify-content-center'>
              <span className='info_text text-white'>Nombre</span>
            </div>
          </div>
          <div className='field'>
            <div className='d-flex align-items-center justify-content-center'>
              <span className='info_text text-white'>Correo</span>
            </div>
          </div>
          <div className='field'>
            <div className='d-flex align-items-center justify-content-center'>
              <span className='info_text text-white'>Teléfono</span>
            </div>
          </div>
          <div className='field'>
            <div className='d-flex align-items-center justify-content-center'>
              <span className='info_text text-white'>Cumpleaños</span>
            </div>
          </div>
        </div>

        <div style={{ maxHeight: '77vh', overflowY: 'auto' }}>
          {!data && !loading ? (
            <div>
              <Spin size='large' className='m-4'>
                <div className='content' />
              </Spin>
            </div>
          ) : !!data && data.length < 1 ? (
            <Empty />
          ) : (
            data.map(({ id, name, urlImg, phone, email, state, role, birthDate }) => {
              return (
                <CustomerCard
                  key={id}
                  name={name}
                  urlImg={urlImg}
                  email={email}
                  phone={phone}
                  state={state}
                  role={role}
                  birthDate={birthDate}
                />
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomersView