import { ROLES, STATES } from '../../../../utils/enums'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { openNotificationWithIcon } from '../../../../helpers/openNotificationWithIcon'
import { Popconfirm } from 'antd'
import { headers } from '../../../../utils/headers'
import { getUsers } from '../../../../helpers/getUsers'
import PropTypes from 'prop-types'
import moment from 'moment/moment'
import './style.scss'

/* Component used to display barber information */

export const BarberCard = ({ id, name, urlImg, email, phone, state, birthDate }) => {

  const API_URL = import.meta.env.VITE_API_URL

  /* Function to delete a barber */
  const onDeleteBarber = async (id) => {
    const requestOptions = {
      method: 'DELETE',
      headers: headers
    }

    try {
      const response = await fetch(API_URL + "api/users/" + id, requestOptions)
      const { data } = await response.json()
      const barber = data.name

      if (response.status === 200) {
        const type = 'success'
        const message = '¡Despido exitoso!'
        const description = `El barbero ${barber} ha sido despedido`
        openNotificationWithIcon(type, message, description)
        await getUsers(ROLES.BARBER, type, setData, setLoading)

      }

    } catch (error) {
      console.log(error)

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
          <span className='info_text _name'>{name}</span>
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
            className={`state ${STATES[state] === state ? 'active' : 'inactive'}`}
            style={{ fontWeight: '500' }}
          >
            {STATES[state] === state ? 'Activo' : 'Inactivo'}
          </span>
        </div>

        <div className='d-flex justify-content-center align-center' style={{ width: '110px' }}>
          <EditOutlined className='m-1' style={{ color: '#01329a', cursor: 'pointer' }} />
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
  birthDate: PropTypes.string.isRequired
}

export default BarberCard
