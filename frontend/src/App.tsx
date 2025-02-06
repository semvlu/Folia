import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Namecard from './pages/Namecard'
import AboutUs from './pages/AboutUs'
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />  {/* default: Home */}
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="namecard" element={<Namecard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
