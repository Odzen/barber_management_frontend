import { Routes, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import MainRouter from './components/MainRouter/index'
import 'antd/dist/reset.css'

const App = () => {
  const location = useLocation()

  return (
    /*MainRouter contains our main routes*/
    <Routes>
      <Route path='/*' element={<MainRouter location={location} />} />
    </Routes>
  )
}

export default App
