import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
<BrowserRouter><App /></BrowserRouter>
  

)
