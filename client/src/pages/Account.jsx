import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, redirect, useParams } from 'react-router-dom'
import axios from 'axios'
import { Accomodations, Booking } from './account'

const Account = () => {
    const {user, setUser, ready} = useContext(UserContext)
    const [loggedOut, setLoggedOut] = useState(false)

    let {subpage} = useParams()
    if(subpage === undefined){
        subpage = 'profile'
    }
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

    const linkClasses = (type=null) => {
        let classes = 'px-4 py-2 rounded-l-full rounded-r-full shadow-md flex gap-2 ' 
        if(type === subpage){
            classes += 'bg-red-500 text-white'
        }
        return classes
    }
  return (
    <main className='p-5'>
         <nav className='flex gap-5 justify-center'>
            <Link to='/account' className={linkClasses('profile')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
                My profile
            </Link>
            <Link to='/account/bookings' className={linkClasses('bookings')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
                Bookings
            </Link>
            <Link to='/account/accomodations' className={linkClasses('accomodations')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
                My accomodations
            </Link>
        </nav>
        {
            (subpage === 'profile') &&
            <section className='flex flex-col md:w-[50%] min-h-[60vh] mx-auto justify-center items-center gap-3'>
                <h1 className='text-3xl'> Welcome to booked.com!</h1>
                <h2 className='text-xl'>You're logged in as {user.name}</h2>
                <h3 className='text-xl'>your email is {user.email}</h3>
                <button onClick={logout} className='text-xl bg-red-500 text-white px-8 py-2 rounded-l-full rounded-r-full'>
                    logout
                </button>
            </section>
        }

        {
            (subpage === 'accomodations')&&
            <Accomodations/>
        }
        {
            (subpage === 'bookings')&&
            <Booking/>
        }
    </main>
  )
}

export default Account