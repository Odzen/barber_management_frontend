import { STATES } from '../../../../utils/enums'
import PropTypes from 'prop-types'
import moment from 'moment/moment'
import './style.scss'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
/* Component used to display barber information */

export const BarberCard = ({ id, name, urlImg, email, phone, state, birthDate }) => {
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

        <div className='field'>
          <EditOutlined className='m-1' style={{ color: '#01329a', cursor: 'pointer' }} id={id} />
          <DeleteOutlined className='m-1' style={{ color: 'red', cursor: 'pointer' }} id={id} />
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
