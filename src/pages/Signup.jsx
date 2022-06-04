import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

function Signup() {
  const [alert, setAlert] = useState(null)

  const [registrationNumber, setRegistrationNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')

  const [signupSuccess, setSignupSuccess] = useState(false)

  const signUpHandler = async e => {
    e.preventDefault()

    if (
      registrationNumber.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0 ||
      name.length === 0 ||
      mobileNumber.length === 0
    ) {
      setAlert(
        'Please enter your registration number, password, name, mobile number and confirm password'
      )
      setTimeout(() => {
        setAlert(null)
      }, 3000)

      return
    }

    if (password !== confirmPassword) {
      setAlert('Password and confirm password do not match')
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
        name,
        mobileNumber,
      }),
    }

    try {
      const response = await fetch('/api/auth/signup', options)
      const data = await response.json()

      if (response.status > 200 && response.status < 300) {
        setSignupSuccess(true)
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
    }
  }

  return (
    <div className='px-5'>
      {signupSuccess && <Navigate to='/login' />}

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

      <form
        className='border border-base-200 p-10 my-10 w-full md:w-4/6 mx-auto rounded-lg shadow-md'
        onSubmit={signUpHandler}
      >
        <div className='mb-6'>
          <label
            htmlFor='name'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Name
          </label>
          <input
            type='text'
            id='name'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full p-2.5'
            placeholder='name'
            required
            value={name}
            onChange={e => {
              setName(e.target.value)
            }}
          />
        </div>
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
            placeholder='eg. 21bds069'
            required
            value={registrationNumber}
            onChange={e => {
              setRegistrationNumber(e.target.value.trim())
            }}
          />
        </div>

        <div className='mb-6'>
          <label
            htmlFor='phone'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Mobile Number
          </label>
          <input
            type='tel'
            id='phone'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full p-2.5'
            placeholder='+91 --'
            required
            value={mobileNumber}
            onChange={e => {
              setMobileNumber(e.target.value.trim())
            }}
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
            placeholder='password'
            required
            value={password}
            onChange={e => {
              setPassword(e.target.value.trim())
            }}
          />
        </div>

        <div className='mb-6'>
          <label
            htmlFor='confirmpassword'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Confirm Password
          </label>
          <input
            type='password'
            id='confirmpassword'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full p-2.5'
            placeholder='password'
            required
            value={confirmPassword}
            onChange={e => {
              setConfirmPassword(e.target.value.trim())
            }}
          />
        </div>

        <button
          type='submit'
          className='text-white bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
        >
          SignUp
        </button>

        <span className='mt-3 block text-xs opacity-90 text-slate-600 rounded-lg width-auto'>
          Registration Number already taken? or if you have any other doubts,
          Contact Team Velocity or 21BCS085
        </span>
      </form>
    </div>
  )
}

export default Signup
