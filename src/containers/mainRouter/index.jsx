import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import ErrorView from '../../security/views/error'
import LoginView from '../../security/views/login'
// import Sidebar from '../sidebar';

const MainRouter = ({ location }) => {
  /* General states for receiving the token */
  const [token, setToken] = useState()
  const tokenLocal = localStorage.getItem('token')

  /* Global variables */
  let role = localStorage.getItem('rol')
  let id = localStorage.getItem('id')
  console.log('token: ', token)
  console.log('tokenLocal: ', tokenLocal)

  /* If we do not have a token, it means that the user cannot enter the software and we redirect him to the Login */
  if (!token && tokenLocal == undefined) {
    return <LoginView setToken={setToken} />
  }
  console.log('location.pathname: ', location.pathname)
  /* If the user's role is Administrator, then we redirect him to the Dashboard */
  if (role == 'Administrator' && location.pathname === '/') {
    return <Navigate to='/main' />
  }

  /* If the user's role is Barber, then we redirect him to his respective internal */
  if (role == 'Barber' && location.pathname === '/') {
    return <Navigate to={`/staff/${id}`} />
  }

  return (
    <>
      {/* SideBar, which allows us to navigate between the modules */}
      {/* <Sidebar setToken={setToken} /> */}

      {/* Main routes conditioned according to the role of the user */}
      <Routes>
        <Route path='/main' element={role == 'Barber' ? <ErrorView /> : <h1>Dashboard</h1>} />
        <Route path='/staff' element={role == 'Barber' ? <ErrorView /> : <h1>Staff</h1>} />
        <Route path='/staff/:id' element={<h1>Staff Id</h1>} />
        <Route path='/users' element={role == 'Barber' ? <ErrorView /> : <h1>Users</h1>} />
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
