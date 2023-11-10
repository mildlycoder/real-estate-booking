import React, { useEffect, useState } from 'react'
import AccountNav from '../../components/AccountNav'
import axios  from 'axios'
import BookingCard from '../../components/BookingCard'

const Booking = () => {
  const [bookings, setBookings] = useState([])
    useEffect(()=>{
        axios.get('/bookings').then((res) => {
          setBookings(res.data)
        })
      
    }, [])
    
  return (
    <main>
      <AccountNav/>
      <section className='flex flex-col md:w-[50%] my-10 mx-auto justify-center items-center gap-3'>
            <h1 className='text-3xl'>Your bookings</h1>
        </section>  
      <main className='p-10'>
        {
          bookings.map(booking => <BookingCard key={booking} info={booking}/>)
        }
      </main>
    </main>
  )
}

export default Booking