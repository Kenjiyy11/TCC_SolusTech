import { useState } from 'react'

import NavBar from './Pages/NavBar/NavBar'
import Solustech from './Pages/Home/Solustech'

function App() {
  const [count, setCount] = useState(0)


  return (
      <div>
      
      <NavBar />
      <Solustech />

      </div>


  )
}

export default App
