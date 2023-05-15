import React from 'react'
import ReactDOM from 'react-dom/client'
import { useLocation } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import 'antd/dist/reset.css'
import App from './App'

const location = useLocation()

ReactDOM.createRoot(document.getElementById('root')).render(<Router><App location={location}/></Router>);
