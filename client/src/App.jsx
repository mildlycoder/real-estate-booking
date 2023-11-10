import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Login, Register, Account, Place} from './pages'
import { Accomodations, Booking, AccomodationForm, BookingPlace } from './pages/account'
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
        <Route path='/account' element={<Account/>}/>
        <Route path='/account/bookings' element={<Booking/>}/>
        <Route path='/account/bookings/:id' element={<BookingPlace/>}/>
        <Route path='/account/accomodations' element={<Accomodations/>}/>
        <Route path='/account/accomodations/new' element={<AccomodationForm/>}/>
        <Route path='/account/accomodations/:id' element={<AccomodationForm/>}/>
        <Route path='/accomodation/:id' element={<Place/>} />

      </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
