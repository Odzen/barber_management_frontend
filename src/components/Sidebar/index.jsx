import { useState, useEffect } from 'react'
import { AdminLinks, CustomerLinks, BarberLinks } from '../Sidebar/Data/index'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import userPhoto from '../../assets/images/UserPhoto.png'
import Item from './Item/index'
import './style.scss'
import { ROLES } from '../../utils/enums'

const Sidebar = ({ setToken }) => {
  /* Global variables */
  const [open, setOpen] = useState(false)
  const [logout, setLogout] = useState(false)
  const [dataUser, setDataUser] = useState(false)

  /* Imperactive method to change location in software */
  let navegate = useNavigate()
  let name = localStorage.getItem('name')
  let urlImg = localStorage.getItem('urlImg')
  let role = localStorage.getItem('role')
  let id = localStorage.getItem('id')

  /* Function to exit the software and go to login */
  const handleLogout = () => {
    setLogout(!logout)
    localStorage.removeItem('token')
    setTimeout(() => {
      setToken()
      navegate('/')
      setLogout(false)
    }, 1000)
  }

  /* Function to have the data of the user who has just entered the software */
  const getData = () => {
    setDataUser({
      name: name,
      urlImg: urlImg,
      role: role,
      id: id
    })
  }

  /* Functions to be executed when the page is rendered */
  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div className={open ? 'sidebarOpen' : 'sidebar'}>
        <div>
          <div className={open ? 'centrarOpen' : ''}>
            <img
              src={!dataUser ? userPhoto : 'data:image/png;base64,' + dataUser.urlImg}
              className='userImg'
            />
          </div>
          <div className='d-flex justify-content-center align-items-center p-3 name'>
            <p>{!dataUser ? userPhoto : dataUser.name}</p>
          </div>

          <div className='cerrar' onClick={() => setOpen(!open)}>
            <svg
              width='1em'
              height='1em'
              viewBox='0 0 30 30'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect width='30' height='30' rx='15' fill='white' />
              <path
                d='M21.125 21.625L15.375 15.875C15.25 15.75 15.1617 15.6146 15.11 15.4687C15.0575 15.3229 15.0312 15.1666 15.0312 15C15.0312 14.8333 15.0575 14.6771 15.11 14.5312C15.1617 14.3854 15.25 14.25 15.375 14.125L21.125 8.37498C21.3542 8.14581 21.6404 8.02581 21.9837 8.01498C22.3279 8.00498 22.625 8.12498 22.875 8.37498C23.1042 8.60415 23.2188 8.89581 23.2188 9.24998C23.2188 9.60415 23.1042 9.89581 22.875 10.125L18.0312 15L22.875 19.875C23.1042 20.1041 23.2237 20.3904 23.2337 20.7337C23.2446 21.0779 23.125 21.375 22.875 21.625C22.6458 21.8541 22.3542 21.9687 22 21.9687C21.6458 21.9687 21.3542 21.8541 21.125 21.625ZM12.875 21.625L7.125 15.875C7 15.75 6.91167 15.6146 6.86 15.4687C6.8075 15.3229 6.78125 15.1666 6.78125 15C6.78125 14.8333 6.8075 14.6771 6.86 14.5312C6.91167 14.3854 7 14.25 7.125 14.125L12.875 8.37498C13.1042 8.14581 13.3908 8.02581 13.735 8.01498C14.0783 8.00498 14.375 8.12498 14.625 8.37498C14.8542 8.60415 14.9688 8.89581 14.9688 9.24998C14.9688 9.60415 14.8542 9.89581 14.625 10.125L9.78125 15L14.625 19.875C14.8542 20.1041 14.9742 20.3904 14.985 20.7337C14.995 21.0779 14.875 21.375 14.625 21.625C14.3958 21.8541 14.1042 21.9687 13.75 21.9687C13.3958 21.9687 13.1042 21.8541 12.875 21.625Z'
                fill='black'
              />
            </svg>
          </div>

          <div className='abrir' onClick={() => setOpen(!open)}>
            <svg
              width='1em'
              height='1em'
              viewBox='0 0 30 30'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect
                x='30'
                y='30'
                width='30'
                height='30'
                rx='15'
                transform='rotate(-180 30 30)'
                fill='white'
              />
              <path
                d='M8.875 8.37502L14.625 14.125C14.75 14.25 14.8383 14.3854 14.89 14.5313C14.9425 14.6771 14.9688 14.8334 14.9688 15C14.9688 15.1667 14.9425 15.3229 14.89 15.4688C14.8383 15.6146 14.75 15.75 14.625 15.875L8.875 21.625C8.64583 21.8542 8.35958 21.9742 8.01625 21.985C7.67208 21.995 7.375 21.875 7.125 21.625C6.89583 21.3959 6.78125 21.1042 6.78125 20.75C6.78125 20.3959 6.89583 20.1042 7.125 19.875L11.9688 15L7.125 10.125C6.89583 9.89585 6.77625 9.6096 6.76625 9.26627C6.75542 8.9221 6.875 8.62502 7.125 8.37502C7.35417 8.14585 7.64583 8.03127 8 8.03127C8.35417 8.03127 8.64583 8.14585 8.875 8.37502ZM17.125 8.37502L22.875 14.125C23 14.25 23.0883 14.3854 23.14 14.5313C23.1925 14.6771 23.2188 14.8334 23.2188 15C23.2188 15.1667 23.1925 15.3229 23.14 15.4688C23.0883 15.6146 23 15.75 22.875 15.875L17.125 21.625C16.8958 21.8542 16.6092 21.9742 16.265 21.985C15.9217 21.995 15.625 21.875 15.375 21.625C15.1458 21.3959 15.0312 21.1042 15.0312 20.75C15.0312 20.3959 15.1458 20.1042 15.375 19.875L20.2188 15L15.375 10.125C15.1458 9.89585 15.0258 9.6096 15.015 9.26627C15.005 8.9221 15.125 8.62502 15.375 8.37502C15.6042 8.14585 15.8958 8.03127 16.25 8.03127C16.6042 8.03127 16.8958 8.14585 17.125 8.37502Z'
                fill='black'
              />
            </svg>
          </div>
        </div>

        <div className='linksContainer'>
          {CustomerLinks &&
            role === ROLES.CUSTOMER &&
            CustomerLinks.map(({ text, to, svg }) => {
              let classes = open ? 'linkOpen' : 'normal'
              let item_text = text ? text : ''

              return (
                <Item key={text} open={open} to={to} svg={svg} text={item_text} classes={classes}>
                  {text}
                </Item>
              )
            })}

          {BarberLinks &&
            role === ROLES.BARBER &&
            BarberLinks.map(({ text, to, svg }) => {
              let classes = open ? 'linkOpen' : 'normal'
              let item_text = text ? text : ''

              return (
                <Item key={text} open={open} to={to} svg={svg} text={item_text} classes={classes}>
                  {text}
                </Item>
              )
            })}

          {AdminLinks &&
            role === ROLES.ADMIN &&
            AdminLinks.map(({ text, to, svg }) => {
              let classes = open ? 'linkOpen' : 'normal'
              let item_text = text ? text : ''

              return (
                <Item key={text} open={open} to={to} svg={svg} text={item_text} classes={classes}>
                  {text}
                </Item>
              )
            })}
        </div>

        <div className='d-flex flex-column justify-center align-items-center'>
          <div onClick={handleLogout} className='salida'>
            <svg
              fill='black'
              viewBox='0 0 24 24'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path fill='none' d='M0 0h24v24H0z'></path>
              <path d='M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z'></path>
            </svg>
          </div>
          <div className={logout ? 'text-center' : 'cargando'}>
            <div className='spinner-grow text-primary' role='status'></div>
          </div>
        </div>
      </div>
    </>
  )
}

Sidebar.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Sidebar
