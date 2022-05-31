import { Link } from 'react-router-dom'

function LoginSignup() {
  return (
    <div className='my-5 px-10 '>
      <div className='alert shadow-md bg-slate-200 lg:px-20'>
        <div>
          <span className='text-3xl '>&#127873;</span>
          <div className='ml-2'>
            <h3 className='font-bold'>Bonus Creds!</h3>
            <div className='text-xs'>
              The early you signup the more creds you get!! Just a simple step
              and claim your points easily.
            </div>
          </div>
        </div>
        <div className='flex-none'>
          <Link to={'/login'} className='btn btn-sm'>
            Login
          </Link>
          <Link
            to={'/signup'}
            className='btn btn-sm btn-outline focus:btn-outline opacity-90 '
          >
            Sign-Up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
