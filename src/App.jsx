import { Routes, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import MainRouter from './containers/mainRouter/index'
import 'antd/dist/reset.css'

const App = ({ location }) => {
  return (
    /*MainRouter contains our main routes*/
    <Routes>
      <Route path='/*' element={<MainRouter location={location} />} />
    </Routes>
  )
}

App.propTypes = {
  location: PropTypes.object.isRequired
}

export default App
