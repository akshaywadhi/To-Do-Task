import LoginPage from "./Components/LoginPage"
import SignupPage from "./Components/SignupPage"
import HomePage from "./Components/HomePage"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./Components/Dashboard"

function App() {


  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/signup" element={<SignupPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
  )
}

export default App
