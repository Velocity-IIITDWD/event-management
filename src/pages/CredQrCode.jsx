import React from 'react'

import { QRCodeSVG } from 'qrcode.react'

import { useLocation } from 'react-router-dom'

function CredQrCode() {
  const domain = window.location.origin

  const id = useLocation().pathname.split('/')[4]

  return (
    <div className='w-full flex justify-center items-center mt-5 md:mt-10 lg:mt-20'>
      <QRCodeSVG
        value={`${domain}/qrcode/${id}`}
        size={500}
        imageSettings={{
          src: 'logo.png',
        }}
        className='mx-10'
      />
    </div>
  )
}

export default CredQrCode
