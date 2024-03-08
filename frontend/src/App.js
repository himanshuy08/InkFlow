import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/dashboard/:roomId' element={<Dashboard/>}/>
    </Routes>
</BrowserRouter>
  )
}

export default App