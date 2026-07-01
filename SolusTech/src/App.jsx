import { Routes, Route } from 'react-router-dom'
import Solustech from './Pages/Home/Solustech.jsx'
import Login from './Pages/Home/Logins/Login.jsx'
import Loja from './Pages/Home/Loja/Loja.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Solustech />} />
      <Route path="/Solustech" element={<Solustech />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Loja" element={<Loja />} />
    </Routes>
  )
}

export default App