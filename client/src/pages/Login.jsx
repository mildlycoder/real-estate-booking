import React, { useState, useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../UserContext'
const Login = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState('')
  const {setUser} = useContext(UserContext)

  const loginUser = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post('/login', {
        name,
        email,
        password
      }, {withCredentials: true})
      alert('login successful')
      setUser(data)
      setRedirect(true);
    } catch (error) {
      setError(error.message)
    }
  }

  if(redirect){
    return <Navigate to='/'/>
  }
  return (
    <main>
        <form className='flex flex-col gap-2 w-[90%] md:w-[30%] mx-auto justify-center items-center grow min-h-[70vh]' onSubmit={loginUser}>
            <h1 className='text-3xl text-center'>Login</h1>
            <input type="email" className='border-[2px] border-gray-300 p-2 text-lg rounded-l-full rounded-r-full w-full ' name='email' placeholder='email@email.com' value={email} onChange={e => setEmail(e.target.value)}/>
            <input type="password" className='border-[2px] border-gray-300 p-2 text-lg rounded-l-full rounded-r-full w-full' name='password' placeholder='enter password' value={password} onChange={e => setPassword(e.target.value)}/>
            <button className='text-white bg-red-500 rounded-l-full rounded-r-full p-3 w-full'>Login</button>

            <h1 className='text-lg w-full text-center'>don't have an account? <Link to='/register'><span className='text-blue-600'>register</span></Link></h1>
        </form>
    </main>
  )
}

export default Login