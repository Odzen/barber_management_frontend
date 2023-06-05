import PropTypes from 'prop-types'
import moment from 'moment/moment'
import './style.scss'

/* Component used to display customer information */

export const CustomerCard = ({ name, urlImg, email, phone, birthDate }) => {
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
      </div>
    </>
  )
}

CustomerCard.propTypes = {
  name: PropTypes.string.isRequired,
  urlImg: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  birthDate: PropTypes.string.isRequired
}

export default CustomerCard
