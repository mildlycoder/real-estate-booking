import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Place = () => {
  const {id} = useParams()
  const [accomodation, setAccomodation] = useState({})
  const [showGallery, setShowGallery] = useState(false)
  useEffect(()=>{
    if(!id){
      return;
    }
    axios.get('/place-info/'+id).then(response => {
      const data = response.data
      setAccomodation(response.data)
    })
  }, [id])

  if(showGallery){
    return(
      <main className='absolute min-w-full min-h-screen bg-black text-white backdrop-blur-sm p-10'>
        <div className='grid gap-5'>
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl'>Photos of {accomodation.title}</h1>
            <button onClick={() => setShowGallery(false)} className='text-xl flex gap-1 items-center bg-white text-black px-4 py-2 rounded-lg'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
              close 
            </button>
          </div>
        {
          accomodation.photos?.map(photo => (
            <div key={photo}>
              <img src={"http://localhost:4000/uploads/"+ photo} className='rounded-lg' alt="" srcset="" />
            </div>
          ))
        }
        </div>
      </main>
    )
  }

  return (
    <main className='p-5'>
      <div className='flex flex-col gap-2 m-10'>
        <h1 className='text-4xl'>{accomodation.title}</h1>
        <h2 className='text-2xl underline flex items-center gap-1'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          {accomodation.address}
        </h2>
      </div>

      <div className='relative'>
        <div className='grid gap-2 grid-cols-[2fr_1fr] m-10'>
          <div className='flex'>
            <img onClick={() => setShowGallery(true)} src={"http://localhost:4000/uploads/"+accomodation.photos?.[0]} className='aspect-square object-cover cursor-pointer rounded-l-lg' alt=""/>
          </div>
          <div className='flex flex-col gap-2'>
            <img onClick={() => setShowGallery(true)} src={"http://localhost:4000/uploads/"+accomodation.photos?.[1]} className='aspect-square object-cover cursor-pointer rounded-tr-lg' alt=""/>
            <img onClick={() => setShowGallery(true)} src={"http://localhost:4000/uploads/"+accomodation.photos?.[2]} className='aspect-square object-cover cursor-pointer rounded-br-lg' alt=""/>
          </div>
        </div>
        <div onClick={() => setShowGallery(true)} className='absolute bottom-4 right-14'>
          <button className='bg-white px-4 py-2 rounded-lg flex gap-2'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
          </svg>
            show more...
          </button>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-5 m-10'>
        <div className='col-span-2 grid gap-5'>
          <h1 className='text-2xl font-semibold underline'>Description</h1>
          <p className='text-xl'>{accomodation.desc}</p>
          <div className='flex flex-col gap-2'>
            <h1 className='text-2xl'><span className='underline'>Check in:</span> {accomodation.checkIn}</h1>
            <h1 className='text-2xl'><span className='underline'>Check Out:</span> {accomodation.checkOut}</h1>
            <h1 className='text-2xl'><span className='underline'>Maximum no. of guest:</span> {accomodation.maxCap}</h1>
          </div>  
        </div>

        <div className='grid gap-5 bg-gray-200 p-5 rounded-lg shadow-lg'>
          <h1 className='text-2xl font-semibold'>Price: ${accomodation.price}/per night </h1>
          <div className='grid grid-cols-2 gap-3'>
            <div className='bg-white  p-5 rounded-lg'>
              <h1 className='text-xl'>Check in</h1><input type="date" name="" id="" />
            </div>
            <div className='bg-white  p-5 rounded-lg'>
              <h1 className='text-xl'>Check out</h1><input type="date" name="" id="" />
            </div>
          </div>

          <div className='bg-white flex gap-3 p-5 rounded-lg'>
              <h1 className='text-xl '>Guests:</h1><input className='text-xl' placeholder='2' type="number" name="" id="" />
          </div>

          <button className='px-6 py-4 bg-red-500 text-white rounded-l-full rounded-r-full text center'>
            Book this
          </button>
        </div>
      </div>

      <div className='m-10 flex flex-col gap-2'>
        <h1 className='text-2xl font-semibold underline'>Perks</h1>
        <ul className='flex flex-col gap-2'>
          {
            accomodation.perks?.map(perk => (
              <li className='flex gap-1 text-xl items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
                {perk}
              </li>
            ))
          }
        </ul>
      </div>
    </main>
  )
}

export default Place