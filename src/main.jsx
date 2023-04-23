import React from 'react';
import ReactDOM from 'react-dom/client'
import { Routes, Route, BrowserRouter as Router, useLocation } from 'react-router-dom'
import MainRouter from './containers/mainRouter/index'
import 'antd/dist/reset.css';

const App = () => {

  const location = useLocation();
  console.log("location: ", location)

  return (
    /*MainRouter contains our main routes*/
    <Routes>
      <Route path='/*' element={<MainRouter location={location} />} />
    </Routes>

  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
)
