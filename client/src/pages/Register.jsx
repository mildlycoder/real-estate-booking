import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const registerUser = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/register', {
        name,
        email,
        password
      })
      alert('account registered, Please Login')
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    <div>
        <form className='flex flex-col gap-2 w-[90%] md:w-[30%] mx-auto justify-center items-center grow min-h-[70vh]' onSubmit={registerUser}>
            <h1 className='text-3xl text-center'>Register</h1>
            <input type="text" className='border-[2px] border-gray-300 p-2 text-lg rounded-l-full rounded-r-full w-full ' 
            name='name' 
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='Joe smoh'/>
            <input type="email" className='border-[2px] border-gray-300 p-2 text-lg rounded-l-full rounded-r-full w-full '
            name='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='email@email.com'/>
            <input type="password" className='border-[2px] border-gray-300 p-2 text-lg rounded-l-full rounded-r-full w-full' 
            name='password' 
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='enter password'/>
            <button className='text-white bg-red-500 rounded-l-full rounded-r-full p-3 w-full'>Register</button>
        </form>
    </div>
  )
}

export default Register