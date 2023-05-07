import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ErrorView from '../../security/views/error'
import LoginView from '../../security/views/login'
import Sidebar from '../../components/sidebar'
import UsersView from '../../modules/users';
import { Routes, Route, Navigate } from 'react-router-dom'
import { ROLES } from '../../utils/enums'

const MainRouter = ({ location }) => {
  /* General states for receiving the token */
  const [token, setToken] = useState()
  const tokenLocal = localStorage.getItem('token')

  /* Global variables */
  let role = localStorage.getItem('role')
  let id = localStorage.getItem('id')

  /* If we do not have a token, it means that the user cannot enter the software and we redirect him to the Login */
  if (!token && tokenLocal == undefined) {
    return <LoginView setToken={setToken} />
  }

  /* If the user's role is Administrator, then we redirect him to the Dashboard */
  if (role == ROLES.ADMIN && location.pathname === '/') {
    return <Navigate to='/main' />
  }

  /* If the user's role is Barber, then we redirect him to his respective internal */
  if (role == ROLES.BARBER && location.pathname === '/') {
    return <Navigate to={`/staff/${id}`} />
  }

  return (
    <>
      {/* SideBar, which allows us to navigate between the modules */}
      <Sidebar setToken={setToken} />

      {/* Main routes conditioned according to the role of the user */}
      <Routes>
        <Route path='/main' element={role !== ROLES.ADMIN ? <ErrorView /> : <h1>Dashboard</h1>} />
        <Route path='/staff' element={role == ROLES.BARBER ? <ErrorView /> : <h1>Staff</h1>} />
        <Route path='/staff/:id' element={<h1>Staff Id</h1>} />
        <Route path='/users' element={role !== ROLES.ADMIN ? <ErrorView /> : <UsersView />} />
        <Route path='/profile' element={<h1>Profile</h1>} />
        {/* <Route path='/customers' element={rol == 'Barber' ? (<ErrorView />) : <h1>Customers</h1>} />
                <Route path='/customers:id' element={rol == 'Barber' ? (<ErrorView />) : <h1>Customer Id</h1>} /> */}

        <Route path='/*' element={<ErrorView />} />
      </Routes>
    </>
  )
}

MainRouter.propTypes = {
  location: PropTypes.string.isRequired
}

export default MainRouter
