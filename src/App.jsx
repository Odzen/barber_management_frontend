import { Routes, Route, BrowserRouter as Router, useLocation } from 'react-router-dom'
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

export default App
