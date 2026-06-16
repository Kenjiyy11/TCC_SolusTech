import { useState } from 'react'
import './App.css'
import HomeFuncionario from './pages/HomeFuncionario/HomeFuncionario'

function App() {
  const [count, setCount] = useState(0)


  return (
      <div>

        <HomeFuncionario />

      </div>

  )
}

export default App
