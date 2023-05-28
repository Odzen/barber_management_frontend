import { openNotificationWithIcon } from '../../../../helpers/openNotificationWithIcon'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { ROLES, STATES } from '../../../../utils/enums'
import { getUsers } from '../../../../helpers/getUsers'
import { headers } from '../../../../utils/headers'
import { Popconfirm, Form } from 'antd'
import { useState } from 'react'
import { getUser } from '../../../../helpers/getUser'
import { UserModal } from '../../../../components/UserModal/UserModal'
import PropTypes from 'prop-types'
import moment from 'moment/moment'
import './style.scss'

/* Component used to display barber information */

export const BarberCard = ({
  id,
  name,
  urlImg,
  email,
  phone,
  state,
  birthDate,
  setData,
  setLoading
}) => {
  const API_URL = import.meta.env.VITE_API_URL
  const _type = 'barbers'
  const [formBarber] = Form.useForm()
  const [registeredUser, setRegisteredUser] = useState(false)
  const [oldUser, setOldUser] = useState({})
  const [modalUpdate, setModalUpdate] = useState(false)

  /* Function to show a update barber modal */
  const showModalUpdateBarber = async (id) => {
    localStorage.setItem('currentUser', id)
    const data = await getUser(id)
    setOldUser(data)
    setModalUpdate(true)
  }

  /* Function to delete a barber */
  const onDeleteBarber = async (id) => {
    const requestOptions = {
      method: 'DELETE',
      headers: headers
    }

    try {
      const response = await fetch(API_URL + 'api/users/' + id, requestOptions)
      const { data } = await response.json()
      const barber = data.name

      if (response.status === 200) {
        const type = 'success'
        const message = '¡Despido exitoso!'
        const description = `El barbero ${barber} ha sido despedido`
        openNotificationWithIcon(type, message, description)
        await getUsers(ROLES.BARBER, _type, setData, setLoading)
      }
    } catch (error) {
      const type = 'warning'
      const message = '¡Ocurrió algo inusual!'
      const description = error.message

      openNotificationWithIcon(type, message, description)
    }
  }

  return (
    <>
      <div className='userCard'>
        <div className='d-flex align-items-center field'>
          <img src={'data:image/png;base64,' + urlImg} alt='avatar' className='userImg' />
          <a className='info_text _name' style={{ cursor: 'pointer' }} href={`/staff/${id}`}>
            {name}
          </a>
        </div>
        <div className='field'>
          <div className='d-flex align-items-center justify-content-center'>
            <span className='info_text text-decoration-underline'>{email}</span>
          </div>
        </div>
        <div className='field'>
          <span className='info_text'>(+57) {phone}</span>
        </div>

        <div className='field'>
          <span className='info_text'>{moment(birthDate).calendar()}</span>
        </div>

        <div className='field'>
          <span
            className={`state ${STATES[state] === 'ACTIVE' ? 'active' : 'inactive'}`}
            style={{ fontWeight: '500' }}
          >
            {STATES[state] == 'ACTIVE' ? 'Activo' : 'Inactivo'}
          </span>
        </div>

        <div className='d-flex justify-content-center align-center' style={{ width: '110px' }}>
          <EditOutlined
            className='m-1'
            style={{ color: '#01329a', cursor: 'pointer' }}
            onClick={() => showModalUpdateBarber(id)}
          />
          <Popconfirm
            title='Despedir barbero'
            description='¿Quieres despedir a este barbero?'
            onConfirm={async () => await onDeleteBarber(id)}
            okText='Sí'
            cancelText='No'
          >
            <DeleteOutlined
              type='link'
              className='m-1'
              style={{ color: 'red', cursor: 'pointer' }}
              id={id}
            />
          </Popconfirm>
        </div>
      </div>

      {/* Modal to create barbers */}
      <UserModal
        title='Editar barbero'
        notifMessage='Actualización exitosa!'
        form={formBarber}
        newUser={oldUser}
        modelRegister={modalUpdate}
        registeredUser={registeredUser}
        setUser={setOldUser}
        setModelRegister={setModalUpdate}
        setRegisteredUser={setRegisteredUser}
        setData={setData}
        setLoading={setLoading}
      />
    </>
  )
}

BarberCard.propTypes = {
  id: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  urlImg: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  birthDate: PropTypes.string.isRequired,
  setData: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired
}

export default BarberCard
