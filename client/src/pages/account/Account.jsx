import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../UserContext'
import { Link, Navigate, redirect, useParams } from 'react-router-dom'
import axios from 'axios'
import { Accomodations, Booking } from '.'
import AccountNav from '../../components/AccountNav'

const Account = () => {
    const {user, setUser, ready} = useContext(UserContext)
    const [loggedOut, setLoggedOut] = useState(false)
    if(!ready){
        return <div>loading....</div>
    }
    
    if(ready && !user){
        return <Navigate to={'/login'}/>
    }

    const logout = async() => {
        await axios.post('/logout')
        setUser(null)
        setLoggedOut(true)
    }
    if(loggedOut){
        return <Navigate to='/'/>
    }
  return (
    <main className='p-5'>
        <AccountNav/>
        <section className='flex flex-col md:w-[50%] min-h-[60vh] mx-auto justify-center items-center gap-3'>
            <h1 className='text-3xl'> Welcome to booked.com!</h1>
            <h2 className='text-xl'>You're logged in as {user.name}</h2>
            <h3 className='text-xl'>your email is {user.email}</h3>
            <button onClick={logout} className='text-xl bg-red-500 text-white px-8 py-2 rounded-l-full rounded-r-full'>
                logout
            </button>
        </section>           
    </main>
  )
}

export default Account