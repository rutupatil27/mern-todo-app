import React from 'react'
import { useState } from 'react'
import axios from 'axios'

import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const login = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('/api/auth/login', {
          username,
          password
        });
        localStorage.setItem('token', response.data.token);
        console.log("Login successful", response.data);
        navigate('/todo');
      } catch (error) {
        console.log("Error during login", error);
      }
    }


    return (
        <div className='flex justify-center items-center min-h-screen bg-linear-to-br from-white to-blue-100 '>
            <div className='h-fit w-96 bg-white py-5 px-10 shadow-lg rounded-2xl flex flex-col items-center gap-6'>

                <form
                onSubmit={login}
                className='flex flex-col gap-4 relative w-full h-full'>
                    <div className='my-4 text-2xl font-semibold text-gray-900 flex justify-center'>
                        <h1>Login Page</h1>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <input type="text" placeholder='Username' 
                        className='w-full p-2 border border-gray-300 rounded-md' 
                        required
                        onChange={(e)=>
                            setUsername(e.target.value)
                        }/>
                        <input type="password" placeholder='Password' 
                        className='w-full p-2 border border-gray-300 rounded-md' 
                        required
                        onChange={(e)=>
                            setPassword(e.target.value)
                        }/>
                    </div>
                    <div className='flex flex-col items-center justify-center '>
                        <button type='submit'
                        className='bg-gray-700 rounded-3xl hover:-translate-0.5 w-25 h-10 text-white font-medium mb-4'>
                            Login
                        </button>
                        <Link to="/signin" className='text-sm text-gray-600 hover:underline'>
                            Don't have an account? Signin
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login