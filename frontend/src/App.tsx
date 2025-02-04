import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Template from './pages/Template'
import AboutUs from './pages/AboutUs'
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />  {/* default: Home */}
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="template" element={<Template />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
