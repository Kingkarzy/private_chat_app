'use client'
import React, { useState } from 'react'

function Home() {
    const [userOption, setUserOption] = useState<string>('');

    const handleSubmit = (option: string) => {
      switch (option) {
            case 'caesarCipher':
              return window.location.href = "/algorithms/caesar"; // Example shift of 3
            case 'columnar':
              return window.location.href = "/algorithms/columnar";
            case 'monoalphabetic':
              return window.location.href = "/algorithms/monoalphabetic";
            case 'otp':
              return window.location.href = "/algorithms/otp";
            case 'playfair':
              return window.location.href = "/algorithms/playfair";
            case 'polyalphabetic':
              return window.location.href = "/algorithms/polyalphabetic";
            case 'railfence':
              return window.location.href = "/algorithms/railFence";
            case 'diffie':
              return window.location.href = "/algorithms/diffie";
            case 'rsa':
              return window.location.href = "/algorithms/rsa";
            default:
              return window.location.href = "/home";
          }
    }
  return (
    <div className={`flex justify-center gap-x-10 items-center w-full h-screen customBg0`}>
     <div className='p-8 px-32 flex flex-col gap-y-10 items-center bg-slate-300 rounded-lg bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-150'>
        <div className=''>
        <h1 className="text-3xl text-white font-bold text-center ">Select A Cryptogrphy Algorithm</h1>
        </div>
        <div>
        <select value={userOption}
          onChange={(e) => setUserOption(e.target.value)}
          className="p-2 text-lg w-50 bg-slate-300 rounded-lg border border-gray-700 focus:ring-4 focus:ring-green-500"
        >
          <option value=""> Select Algorithm</option>
          <option value="playfair">Playfair</option>
          <option value="monoalphabetic">Monoalphabetic</option>
          <option value="columnar">Columnar</option>
          <option value="caesarCipher">Caesar</option>
          <option value="otp">OTP</option>
          <option value="diffie">Diffie-Hellman</option> 
          <option value="railfence">Rail Fence</option>
          <option value="polyalphabetic">Polyalphabetic</option> 
          <option value="rsa">RSA</option> 
        </select>
        </div>
        <div>
          <button className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          onClick={() => handleSubmit(userOption)}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Home