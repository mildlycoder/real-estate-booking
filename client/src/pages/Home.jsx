import React, { useEffect } from 'react'
import { UserContext } from '../UserContext'
import { useContext, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Home = () => {

  const [accomodations, setAccomodations] = useState([])
  useEffect(() => {
    axios.get('/get-all-places').then( response => {
      setAccomodations(response.data)
    })
  }, [])
  return (
    <main className='p-5 grid grid-cols-2 md:grid-cols-3 gap-10'>
      { (accomodations.length > 0)&&
        accomodations.map(accomodation => (
          <Link to={'/accomodation/' + accomodation._id} key={accomodation._id} className='p-6 rounded-lg border-gray-300 cursor-pointer hover:scale-105 transition-all flex flex-col gap-4'> 
            <div className='bg-gray-200 rounded-lg flex'>
              <img src={"http://localhost:4000/uploads/" + accomodation.photos?.[0]} className='object-cover aspect-square rounded-lg' alt="" />
            </div>
            <div>
              <h1 className='text-2xl' >{accomodation.title}</h1>
              <h1 className='text-xl text-gray-600' >{accomodation.address}</h1>
              <h1 className='text-xl font-bold'>${accomodation.price} per night</h1>
            </div>
          </Link>
        ))
      }
    </main>
  )
}

export default Home