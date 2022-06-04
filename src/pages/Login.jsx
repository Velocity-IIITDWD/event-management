import React, { useState, useContext } from 'react'
import { authContext } from '../store/authContext'

import { Navigate } from 'react-router-dom'

function Login() {
  const [alert, setAlert] = useState(null)
  const [registrationNumber, setRegistrationNumber] = useState('')
  const [password, setPassword] = useState('')

  const [loginSuccess, setLoginSuccess] = useState(false)

  const {
    newToken,
    setType,
    login,
    setRegistrationNumber: setAuthRegistationNumber,
    setStudentId,
  } = useContext(authContext)

  const registrationNumberChangeHandler = e => {
    setRegistrationNumber(e.target.value.trim())
  }

  const passwordChangeHandler = e => {
    setPassword(e.target.value.trim())
  }

  const loginHandler = async e => {
    e.preventDefault()

    if (registrationNumber.length === 0 || password.length === 0) {
      setAlert('Please enter your registration number and password')
      setTimeout(() => {
        setAlert(null)
      }, 3000)
      return
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        registrationNumber,
        password,
      }),
    }

    try {
      const response = await fetch('/api/auth/login', options)
      const data = await response.json()

      if (response.status === 200) {
        const { token, type, studentId } = data

        localStorage.setItem('token', token)
        localStorage.setItem('type', type)
        localStorage.setItem('registrationNumber', registrationNumber)
        localStorage.setItem('studentId', studentId)

        newToken(token)
        setType(type)
        setAuthRegistationNumber(registrationNumber)
        setStudentId(studentId)
        login()

        setLoginSuccess(true)
      } else {
        setAlert(data.message)
        setTimeout(() => {
          setAlert(null)
        }, 3000)
      }
    } catch (err) {
      setAlert(err.message)
      setTimeout(() => {
        setAlert(null)
      }, 3000)

      return
    }

    return
  }

  return (
    <div className='px-5'>
      {loginSuccess && <Navigate to='/' />}

      <form
        className='border border-base-200 p-10 mt-10 w-full md:w-4/6 mx-auto rounded-lg shadow-md'
        onSubmit={loginHandler}
      >
        {alert && (
          <div className='alert shadow mb-5'>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='stroke-info flex-shrink-0 w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                ></path>
              </svg>
              <span>{alert}</span>
            </div>
          </div>
        )}

        <div className='mb-6'>
          <label
            htmlFor='reg'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Registration Number
          </label>
          <input
            type='text'
            id='reg'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full p-2.5'
            placeholder='eg. 21bcs069'
            required
            value={registrationNumber}
            onChange={registrationNumberChangeHandler}
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='password'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Password
          </label>
          <input
            type='password'
            id='password'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full p-2.5'
            placeholder='passowrd'
            required
            value={password}
            onChange={passwordChangeHandler}
          />
        </div>
        <button
          type='submit'
          className='text-white bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
        >
          Login
        </button>

        <span className='mt-3 block text-xs opacity-90 text-slate-600 rounded-lg width-auto'>
          Forgot Password? Contact Team Velocity or 21BCS085
        </span>
      </form>
    </div>
  )
}

export default Login
