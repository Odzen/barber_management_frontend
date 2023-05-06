import React from 'react'
import { NavLink } from 'react-router-dom'
import './item.scss'

/* Component to display each of the modules in the Sidebar */

const Item = ({ text = '', to = '', svg = '', open = false }) => {
  return (
    <div className='container_item'>
      <NavLink className={open ? 'linkOpen' : 'normal'} to={to}>
        <div>{svg}</div>
        {open ? <p>{text}</p> : null}
      </NavLink>
    </div>
  )
}

export default Item
