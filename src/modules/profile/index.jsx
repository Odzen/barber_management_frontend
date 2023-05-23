import { useState, useEffect } from 'react'
import { STATES } from '../../utils/enums'
import { getUser } from '../../helpers/getUser'
import moment from 'moment/moment'
import './style.scss'
import { getState } from '../../helpers/getState'
import { getRole } from '../../helpers/getRole'

export const UserProfile = () => {
  const [data, setData] = useState(false)

  const getUserData = async () => {
    const id = window.location.pathname.split('/staff/')[1] || localStorage.getItem('id')
    const data = await getUser(id)
    setData(data)
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <div className='contenedor_main'>
      <div className='container'>
        <div
          className='d-flex justify-content-center align-items-center mb-3'
          style={{ margin: '10px 20px' }}
        >
          <h1 className='_title' style={{ marginBottom: '0 important' }}>
            Mi perfil
          </h1>
        </div>
        <div className='d-flex justify-content-center align-items-center'>
          <div className='d-flex justify-content-center align-items-center flex-column cardProfile'>
            <img
              src={data?.urlImg ? `data:image/png;base64,${data.urlImg}` : ''}
              alt='My photo'
              className='imgProfile'
            />
            <span className='name'>{data.name}</span>
            <span className='subfields'>{data.email}</span>
            <span className='subfields'>{data.phone}</span>
            <span className='subfields'>{moment(data.birthDate).calendar()}</span>
            <span className='subfields'>{getRole(data.role)}</span>
            <span
              className={`state ${STATES[data.state] === 'ACTIVE' ? 'active' : 'inactive'}`}
              style={{ fontWeight: '500' }}
            >
              {getState(data.state)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
