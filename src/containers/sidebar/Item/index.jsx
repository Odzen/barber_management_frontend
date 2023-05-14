import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import './item.scss'

/* Component to display each of the modules in the Sidebar */

const Item = ({ text, to, svg, classes }) => {
  return (
    <div className='container_item'>
      <NavLink className={classes} to={to}>
        <div>{svg}</div>
        <p>{text}</p>
      </NavLink>
    </div>
  )
}

Item.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  svg: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired
}

export default Item
