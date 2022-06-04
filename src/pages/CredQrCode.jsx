import React from 'react'

import { QRCodeSVG } from 'qrcode.react'

import { useLocation } from 'react-router-dom'

function CredQrCode() {
  const domain = window.location.origin

  return (
    <div className='w-full flex justify-center items-center mt-20'>
      <QRCodeSVG
        value={`${domain}/qrcode/${useLocation().pathname.split('/')[4]}`}
        size={500}
        imageSettings={{
          src: 'logo.png',
        }}
      />
    </div>
  )
}

export default CredQrCode
