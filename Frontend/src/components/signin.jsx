import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate();
    const signin = async (e) => {
      e.preventDefault();
      try {
            const response = await axios.post('/api/auth/register', {
            email,
            username,
            password
          });
          console.log("Signin successful", response.data);
          Navigate('/login');
        } catch (error) {
          console.log("Error during signin", error);
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-linear-to-br from-white to-blue-100'>
            <div className='h-fit w-96 bg-white py-5 px-10 shadow-lg rounded-2xl flex flex-col items-center gap-6'>

                <form
                onSubmit={signin}
                className='flex flex-col gap-4 relative w-full h-full'>
                    <div className='my-4 text-2xl font-semibold text-gray-900 flex justify-center'>
                        <h1>Signin Page</h1>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <input type="email" placeholder='Email'
                        className='w-full p-2 border border-gray-300 rounded-md' 
                        required
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }}/>
                        <input type="text" placeholder='Username' 
                        className='w-full p-2 border border-gray-300 rounded-md' 
                        required
                        onChange={(e)=>{
                            setUsername(e.target.value)
                        }}
                        />
                        <input type="password" placeholder='Password' 
                        className='w-full p-2 border border-gray-300 rounded-md' 
                        required
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                        />
                    </div>
                    <div className='flex flex-col items-center justify-center '>
                        <button type='submit'
                        className='bg-gray-700 rounded-3xl hover:-translate-0.5 w-25 h-10 text-white font-medium mb-4 '>
                            Signin
                        </button>
                        <Link to="/login" className='text-sm text-gray-600 hover:underline'>
                            Already have an account? Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signin