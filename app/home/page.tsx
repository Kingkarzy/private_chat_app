'use client'
import React, { useState } from 'react'

function Home() {
    const [userOption, setUserOption] = useState<string>('');

    const handleSubmit = (option: string) => {
      switch (option) {
            case 'aesEncrypt':
              return window.location.href = "algorithms/aes";
            case 'caesarCipher':
              return window.location.href = "/algorithms/caesar"; // Example shift of 3
            case 'columnarEncrypt':
              return window.location.href = "/columnar";;
            case 'desEncrypt':
              return window.location.href = "/des";
            case 'ecc':
              return window.location.href = "/ecc";
            case 'sha256Hash':
              return window.location.href = "/sha256";;
            case 'hillCipherEncrypt':
              return window.location.href = "/hill";
            case 'monoalphabetic':
              return window.location.href = "/algorithms/monoalphabetic";
            case 'otpEncrypt':
              return window.location.href = "/otp";
            case 'playfairEncrypt':
              return window.location.href = "/playfair";
            case 'polyalphabetic':
              return window.location.href = "/algorithms/polyalphabetic";
            case 'railFenceEncrypt':
              return window.location.href = "/railFence";
            case 'rc4Encrypt':
              return window.location.href = "/rc4";
            case 'rsaEncrypt':
              return window.location.href = "/rsa";
            case 'diffie-hellman':
              return window.location.href = "/diffie-hellman";
            default:
              return window.location.href = "/#";
          }
    }
  return (
    <div className="flex justify-center gap-x-10 items-center h-screen">
      <div>
        <h1 className="text-3xl font-bold text-center">Select A Cipher Algorithm</h1>
      </div>
     
       <div>
        <select value={userOption}
              onChange={(e) => setUserOption(e.target.value)}
              className="p-2 text-lg w-50 bg-slate-300 rounded-lg border border-gray-700 focus:ring-4 focus:ring-green-500"
            >
          <option value="rc4">RC4</option>
          <option value="aes">AES</option>
          <option value="rsa">RSA</option>
          <option value="playfair">Playfair</option>
          <option value="des">DES</option>
          <option value="hill">Hill</option>
          <option value="monoalphabetic">Monoalphabetic</option>
          <option value="columnar">Columnar</option>
          <option value="caesarCipher">Caesar</option>
          <option value="otp">OTP</option>
          <option value="diffie-hellman">Diffie-Hellman</option>
          <option value="dsa">DSA</option>
          <option value="ecc">ECC</option>  
          <option value="sha256">SHA256</option>  
          <option value="railfence">Rail Fence</option>
          <option value="polyalphabetic">Polyalphabetic</option> 
        </select>
       </div>
       <div>
        <button className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
         onClick={() => handleSubmit(userOption)}>Submit</button>
       </div>
        
    </div>
  )
}

export default Home