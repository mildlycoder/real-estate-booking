import React, { useState, useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import axios from 'axios'
import AccomodationForm from './AccomodationForm'
const Accomodations = () => {

    const {action, id} = useParams()
    const [accomodations, setAccomodations] = useState([])

    useEffect(() =>{
        axios.get('/places').then(({data}) => {
            setAccomodations(data)
        })
    }, [])
    console.log(action)
   return (
    <section className='p-5'>
        {
            (action !== 'new')&&
            <section className='flex flex-col justify-center items-center'>
                <Link to='/account/accomodations/new'>
                    <button className='flex items-center px-6 py-2 bg-red-500 text-white rounded-l-full rounded-r-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                        Add new place
                    </button>
                </Link>
                <section className='m-5 flex flex-col-reverse gap-10 w-[60%]'>
                    {
                        (accomodations.length > 0)&&
                        accomodations.map(accomodation => (
                            <Link to={'/account/accomodations/' + accomodation._id} key={accomodation._id}>
                                <div  className='p-5 rounded-lg shadow-md  border-[1px] border-gray-300 grid grid-cols-3 gap-5 cursor-pointer hover:scale-105 transition-all'>
                                    <div className=''>
                                        <img src={ accomodation.photos[0]} alt="" className='rounded-lg aspect-square object-cover' />
                                    </div>
                                    <div className='flex flex-col col-span-2 gap-2'>
                                        <h1 className='text-2xl'>{accomodation.title}</h1>
                                        <h2 className='text-xl'>{accomodation.address}</h2>
                                        <h3 className='text-xl text-gray-500 '>{accomodation.desc}</h3>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </section>
            </section>
        }
        {
            (action === 'new')&&
            <AccomodationForm/>
        }
        {
            (id)&&
            <AccodmodationsDetails/>
        }
    </section>
  )
}

export default Accomodations