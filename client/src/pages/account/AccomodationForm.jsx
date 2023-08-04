import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link, useParams, Navigate } from 'react-router-dom'

const AccomodationForm = () => {
    const {id} = useParams()

    useEffect(()=>{
        if(!id){
            return
        }
        axios.get('/places/' +id).then(response => {
            const {data} = response
            console.log(data)
            setTitle(data.title)
            setAddress(data.address)
            setAddedPhotos(data.photos)
            setDescription(data.desc)
            setPerks(data.perks)
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut)
            setMaxCap(data.maxCap)
        })
    },[id])

    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [photoLink, setPhotoLink] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxCap, setMaxCap] = useState('')
    const [redirect, setRedirect] = useState(false)

    const addPhotosLink = async (e) => {
        e.preventDefault()
        const {data:filename} = await axios.post('/upload-photo-link', {Link: photoLink})
        console.log(filename)
        setAddedPhotos( prev => {
            return [...prev, filename]
        })
        setPhotoLink('')
    }   

    const uploadPhoto =  (e) => {
        const files = e.target.files
        const data = new FormData()
        for(let i=0; i < files.length; i++){
            data.append('photos', files[i])
        }
        axios.post('/upload', data, {
            headers: {'Content-type': 'multipart/form-data'}
        }).then(response => {
            const {data: filenames} = response;
            setAddedPhotos(prev => {
                return [...prev, ...filenames]
            })
        })
    }

    const removePhoto = (e,filename) => {
        e.preventDefault()
        setAddedPhotos([...addedPhotos.filter(photo => photo !== filename)])
    }

    const selectCover = (e,filename) => {
        e.preventDefault()
        setAddedPhotos([filename, ...addedPhotos.filter(photo => photo !== filename)])
    }
    const handleCBClick = (e) => {
        const { checked, name} = e.target
        console.log(checked, name)
        if(checked){
            setPerks(prev => {
                return [...perks, name]
            })
        }else{
            setPerks([...perks.filter(selectedName => selectedName !== name)])
        }
    }
    const savePlace = async (e) => {
        e.preventDefault()
        const placeInfo = {
            title,
            address,
            addedPhotos,
            description,
            perks,
            checkIn,
            checkOut,
            maxCap
        }
        if (id){
            await axios.put('/place', {id, ...placeInfo})
        } else{
            await axios.post('/place', placeInfo)
        }
        
        setRedirect(true)
    }

    if(redirect){
        return <Navigate to='/account/accomodations'/>
    }
  return (
            <section className='m-10'>
            <form className='flex flex-col gap-2 mx-auto w-[90%] md:w-[60%]' onSubmit={savePlace}>
            <h1 className='text-3xl text-center my-5'>Enter the accomodations details here</h1>

            <h1 className='text-2xl mt-2'>Ttile</h1>
            <input type="text" className='border-[2px] border-gray-300 p-2 text-lg rounded-l-full rounded-r-full w-full ' name='tile' placeholder='eg: sweet home' 
            value={title}
            onChange={e => setTitle(e.target.value)}
            />

            <h1 className='text-2xl mt-2'>Address</h1>
            <input type="text" className='border-[2px] border-gray-300 p-2 text-lg rounded-l-full rounded-r-full w-full' name='address' placeholder='eg: boulevard st.'
            value={address}
            onChange={e => setAddress(e.target.value)}
            />

            <div>
                <h1 className='text-2xl mt-2'>Photos</h1>
            <div className='flex gap-2'>
                <input type="text" className='border-[2px] border-gray-300 p-2 text-lg rounded-l-full rounded-r-lg w-full'placeholder='add with links...jpg'
                value={photoLink}
                onChange={e => setPhotoLink(e.target.value)}
                />
                <button onClick={addPhotosLink} className='px-4 py-2 text-white bg-red-500 basis-1/6 rounded-l-lg rounded-r-full'>
                    add photo
                </button>
            </div>

                <div className='flex flex-wrap m-5'>
                    {
                        (addedPhotos.length > 0)&&
                        addedPhotos.map(link => {
                            return(
                               <div key={link} className='relative'>
                                 <img src={"http://localhost:4000/uploads/" + link} alt="" className='rounded-md m-3 max-h-[200px]'/>
                                 <button onClick={(e) => removePhoto(e,link)} className='bg-white rounded-full border-2 absolute right-6 bottom-6 cursor-pointer hover:scale-125 transition-all'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                                <button onClick={(e) => selectCover(e,link)} className='bg-white rounded-full border-2 absolute right-16 bottom-6 cursor-pointer hover:scale-125 transition-all'>
                                    {
                                        (addedPhotos[0] === link) ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                          </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                            </svg>
                                        )
                                    }
                                </button>
                               </div>
                            )
                        })
                    }
                    <label className='h-[200px] rounded-md border-[2px] border-gray-300 border-dashed md:w-[33%] m-2 flex items-center justify-center gap-2 text-2xl text-gray-400'>
                    <input type="file" multiple className='hidden' onChange={uploadPhoto}/>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    Upload
                    </label>
                </div>
            </div>

            <h1 className='text-2xl mt-2'>Description</h1>
            <textarea className='w-full min-h-[20vh] border-[2px] border-gray-300 p-2 text-lg rounded-lg'
            value={description}
            onChange={e => setDescription(e.target.value)}
            ></textarea>

            <h1 className='text-2xl mt-2'>Perks</h1>
            <div className='text-xl flex gap-2'>
                <label className='flex items-center gap-2 p-4 border-[2px] border-gray-300 rounded-lg'>
                    <input type="checkbox" checked={perks.includes('wifi')} name='wifi' onChange={handleCBClick}/>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                    </svg>
                    <span>wifi</span>
                </label>

                <label className='flex items-center gap-2 p-4 border-[2px] border-gray-300 rounded-lg'>
                    <input type="checkbox" checked={perks.includes('TV')} name='TV'  onChange={handleCBClick}/>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                    <span>TV</span>
                </label>

                <label className='flex items-center gap-2 p-4 border-[2px] border-gray-300 rounded-lg'>
                    <input type="checkbox" checked={perks.includes('parking')} name='parking' onChange={handleCBClick}/>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                    <span>Parking</span>
                </label>

                <label className='flex items-center gap-2 p-4 border-[2px] border-gray-300 rounded-lg'>
                    <input type="checkbox" checked={perks.includes('pets')} name='pets' onChange={handleCBClick}/>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                    </svg>
                    <span>Pets</span>
                </label>

                <label className='flex items-center gap-2 p-4 border-[2px] border-gray-300 rounded-lg'>
                    <input type="checkbox" checked={perks.includes('private entrance')} name='private entrance' onChange={handleCBClick}/>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                    <span>Private entrance</span>
                </label>
            </div>

            <h1 className='text-2xl mt-2'>Accomodation details</h1>
            <div className='grid md:grid-cols-3 gap-10'>
                <div>
                    <h1 className='text-2xl text-gray-500'>Check in</h1>
                    <input type="text" className='border-[2px] border-gray-300 p-2 text-lg rounded-l-full rounded-r-full w-full ' placeholder='06:00' 
                    value={checkIn}
                    onChange={e => setCheckIn(e.target.value)}
                    />
                </div>
                <div>
                    <h1 className='text-2xl text-gray-500'>Check out</h1>
                    <input type="text" className='border-[2px] border-gray-300 p-2 text-lg rounded-l-full rounded-r-full w-full ' placeholder='06:00' 
                    value={checkOut}
                    onChange={e => setCheckOut(e.target.value)}
                    />
                </div>
                <div>
                    <h1 className='text-2xl text-gray-500'>Max guests</h1>
                    <input type="text" className='border-[2px] border-gray-300 p-2 text-lg rounded-l-full rounded-r-full w-full ' placeholder='16:00' 
                    value={maxCap}
                    onChange={e => setMaxCap(e.target.value)}
                    />
                </div>
            </div>

            <button className='text-white bg-red-500 rounded-l-full rounded-r-full p-3 w-full'>
                {id? 'save place': 'create place'}
            </button>
            </form>
        </section>
  )
}

export default AccomodationForm