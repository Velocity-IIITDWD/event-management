import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHtml5QrCodeScanner } from 'react-html5-qrcode-reader'

function VerifyEventRegistrations() {
  const { Html5QrcodeScanner } = useHtml5QrCodeScanner(
    'https://unpkg.com/html5-qrcode@2.3.4/html5-qrcode.min.js'
  )

  const params = useParams()

  const [registrationNumber, setRegistrationNumber] = useState('')

  useEffect(() => {
    if (Html5QrcodeScanner) {
      // Creates anew instance of `HtmlQrcodeScanner` and renders the block.
      let html5QrcodeScanner = new Html5QrcodeScanner(
        'reader',
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
      )
      html5QrcodeScanner.render(
        data => setRegistrationNumber(data),
        err => console.log('err ->', err)
      )
    }
  }, [Html5QrcodeScanner])

  const [details, setDetails] = useState({
    name: '',
    isRegistered: '',
    message: '',
  })

  const handleSuccess = useCallback(
    async registrationNumber => {
      const response = await fetch(
        '/.netlify/functions/app/registrations/verify/' +
          params.eventId +
          '/' +
          registrationNumber,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      const data = await response.json()

      if (response.status === 200) {
        setDetails(data)
      }
    },
    [params.eventId]
  )

  useEffect(() => {
    if (registrationNumber) {
      handleSuccess(registrationNumber)
    }
  }, [registrationNumber, handleSuccess])

  return (
    <>
      <div className='mt-10 px-20 text-xl'>
        Is Registered: {details.isRegistered ? 'Yes' : 'No'}
        <br />
        Name: {details.name}
      </div>
      <div className='h-24' id='reader'></div>
    </>
  )
}

export default VerifyEventRegistrations
