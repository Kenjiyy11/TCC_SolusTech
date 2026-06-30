import { Routes, Route } from 'react-router-dom'
import Solustech from './Pages/Home/Solustech'
import Login from './Pages/Home/login/Login.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Solustech />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App