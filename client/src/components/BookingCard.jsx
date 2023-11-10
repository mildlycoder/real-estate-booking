import axios from 'axios'
import React, { useEffect, useState } from 'react'

const BookingCard = ({info}) => {

    const [place, setPlace ] = useState(null)
    useEffect(()=> {
        axios.get('/place-info/' + info.place).then((res) => {
            setPlace(res.data)
          })
    },[])

    if(!place){
        return <h1>loading...</h1>
    }

    return (
    <div>
        <div  className='p-5 rounded-lg shadow-md  border-[1px] border-gray-300 grid grid-cols-3 gap-5 cursor-pointer hover:scale-105 transition-all'>
            <div className=''>
                <img src={ place.photos[0]} alt="" className='rounded-lg aspect-square object-cover' />
            </div>
            <div className='flex flex-col col-span-2 gap-2'>
                <h1 className='text-2xl'>{place.title}</h1>
                <h2 className='text-xl'>{place.address}</h2>
                <h3 className='text-xl text-gray-500 '>{place.desc}</h3>
            </div>
        </div>
    </div>
  )
}

export default BookingCard