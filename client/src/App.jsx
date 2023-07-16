import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Login, Register } from './pages'
import Layout from './Layout'
import axios from 'axios'
import { UserContext, UserContextProvider } from './UserContext'

axios.defaults.baseURL = 'http://localhost:4000/'
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App