import { useState, useEffect } from 'react'
import { Links } from '../sidebar/Data/index'
import { useNavigate } from 'react-router-dom'
import userPhoto from '../../assets/images/UserPhoto.png'
import { ROLES } from '../../utils/enums'
import Item from './Item'
import './sidebar.scss'

const Sidebar = ({ setToken }) => {
  /* Global variables */
  const [open, setOpen] = useState(false)
  const [logout, setLogout] = useState(false)
  const [dataUser, setDataUser] = useState(false)

  /* Imperactive method to change location in software */
  let navegate = useNavigate()

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
    let name = localStorage.getItem('name')
    let urlImg = localStorage.getItem('urlImg')
    let role = localStorage.getItem('role')
    let id = localStorage.getItem('id')

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
        <div className={open ? 'centrarOpen' : ''}>
          <img
            src={!dataUser ? userPhoto : "data:image/png;base64," + dataUser.urlImg}
            alt=''
            className='hamburger'
            onClick={() => setOpen(!open)}
          />
        </div>

        <div className='d-flex justify-content-center align-items-center p-3 name'>
          <p>{!dataUser ? userPhoto : dataUser.name}</p>
        </div>

        {/* <div className='salida'>
          <div>
            <a onClick={handleLogout}>
              <svg
                fill='white'
                viewBox='0 0 24 24'
                height='1em'
                width='1em'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path fill='none' d='M0 0h24v24H0z'></path>
                <path d='M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z'></path>
              </svg>
            </a>
          </div>
        </div> */}

        <div className='salida'>
          <div>
            <a onClick={handleLogout}>
              <svg
                fill='white'
                viewBox='0 0 24 24'
                height='1em'
                width='1em'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path fill='none' d='M0 0h24v24H0z'></path>
                <path d='M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z'></path>
              </svg>
            </a>
          </div>
        </div>

        <div className='linksContainer'>
          {dataUser.role == ROLES.ADMIN &&
            Links &&
            Links.map(({ text, to, svg }) => (
              <Item key={text} open={open} to={to} svg={svg} text={text}>
                {text}
              </Item>
            ))}
        </div>

        <div className={logout ? 'text-center' : 'cargando'}>
          <div className='spinner-grow text-primary' role='status'></div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
