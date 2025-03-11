'use client'

import React, { useState, useEffect, useRef } from 'react';
import crypto from 'crypto';
import { aesEncrypt, aesDecrypt } from '../algorithms/aes/aes-encrypt'; 
import { caesarCipher, caesarDecipher } from '../algorithms/caesar/caesar_cipher'; 
import { columnarEncrypt, columnarDecrypt } from '../algorithms/columnar_transposition'; 
import { desEncrypt, desDecrypt } from '../algorithms/des'; 
// import { generateDiffieHellmanKeys } from '../../algorithms/diffie_hellman'; 
// import { dsaSignMessage, dsaVerifyMessage } from '../../algorithms/dsa'; 
import { encryptWithPublicKey, decryptWithPrivateKey } from '../algorithms/ecc'; 
import { sha256Hash } from '../algorithms/hash_SHA'; 
import { hillCipherEncrypt, hillCipherDecrypt } from '../algorithms/hill'; 
import { monoalphabeticCipher, monoalphabeticDecrypt } from '../algorithms/monoalphabetic/monoalphabetic'; 
import { otpEncrypt, otpDecrypt } from '../algorithms/one_time_pad'; 
import { playfairEncrypt, playfairDecrypt } from '../algorithms/playfair/playfair'; 
import { polyalphabeticCipherEncrypt, polyalphabeticCipherDecrypt } from '../algorithms/polyalphabetic/polyalphabetic'; 
import { railFenceEncrypt, railFenceDecrypt } from '../algorithms/rail_fence'; 
import { rc4Encrypt, rc4Decrypt } from '../algorithms/rc4'; 
// import { rsaEncrypt, rsaDecrypt } from '../../algorithms/rsa'; 

import { ToastContainer, toast } from 'react-toastify';

// ICOONS 
import { MdAttachFile } from "react-icons/md";

import Image from 'next/image';
import user1Avatar from '@/assets/user1.png';
import user2Avatar from '@/assets/user2.png';
const ChatApp = () => {
  const [messages, setMessages] = useState([
    { sender: 'User 1', text: '', encryptionMethod: '', timestamp: '' },
    { sender: 'User 2', text: '', encryptionMethod: '', timestamp: '' }
  ]);

  const aesKey = crypto.randomBytes(32); // Generate a random 32-byte AES key

  const [user1Message, setUser1Message] = useState('');
  const [user2Message, setUser2Message] = useState('');
  
  const [user1Option, setUser1Option] = useState<string>('');
  const [user2Option, setUser2Option] = useState<string>('');

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const [imagePreview, setImagePreview] = useState<HTMLDivElement | string>("");


  // Function to get the corresponding encryption or decryption function based on selected option
  const getEncryptionFunction = (option: string, message: string, isEncrypt: boolean) => {
    switch (option) {
      case 'aesEncrypt':
        return isEncrypt ? aesEncrypt(message, aesKey) : aesDecrypt(message, aesKey);
      case 'caesarCipher':
        return isEncrypt ? caesarCipher(message, 3) : caesarDecipher(message, 3); // Example shift of 3
      case 'columnarEncrypt':
        return isEncrypt ? columnarEncrypt(message, 'KEY') : columnarDecrypt(message, 'KEY');
      case 'desEncrypt':
        return isEncrypt ? desEncrypt(message, aesKey.toString('base64')) : desDecrypt(message, aesKey.toString('base64'));
      case 'ecc':
        return isEncrypt ? encryptWithPublicKey(message) : decryptWithPrivateKey(message);
      case 'sha256Hash':
        return sha256Hash(message);
      case 'hillCipherEncrypt':
        return isEncrypt ? hillCipherEncrypt(message, [[7, 2], [17, 25]]) : hillCipherDecrypt(message, [[7, 2], [17, 25]]);
      case 'monoalphabeticCipher':
        return isEncrypt ? monoalphabeticCipher(message, 'KEY') : monoalphabeticDecrypt(message, 'KEY');
      case 'otpEncrypt':
        return isEncrypt ? otpEncrypt(message, 'KEY') : otpDecrypt(message, 'KEY');
      case 'playfairEncrypt':
        return isEncrypt ? playfairEncrypt(message, 'KEY') : playfairDecrypt(message, 'KEY');
      case 'polyalphabeticCipherEncrypt':
        return isEncrypt ? polyalphabeticCipherEncrypt(message, 'KEY') : polyalphabeticCipherDecrypt(message, 'KEY');
      case 'railFenceEncrypt':
        return isEncrypt ? railFenceEncrypt(message, 3) : railFenceDecrypt(message, 3); // Example of 3 rows
      case 'rc4Encrypt':
        return isEncrypt ? rc4Encrypt(message, aesKey.toString('base64')) : rc4Decrypt(message, aesKey.toString('base64'));
      // case 'rsaEncrypt':
      //   return isEncrypt ? rsaEncrypt(message, aesKey.toString('base64')) : rsaDecrypt(message, aesKey.toString('base64'));
      default:
        return message;
    }
  };

  const handleSendMessage = (sender: string, message: string, option: string, isEncrypt: boolean) => {
    if (message.trim() && option) {
      const processedMessage = getEncryptionFunction(option, message, isEncrypt);
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Generate timestamp
      setMessages([...messages, { sender, text: processedMessage, encryptionMethod: option, timestamp }]);
      if (sender === 'User 1') setUser1Option(''); 
      if (sender === 'User 2') setUser2Option(''); 
    }
  };

  const handleDecryption = (sender: string, message: string, option: string, encryptionMethod: string) => {
    if (message.trim() && option) {
      if (option !== encryptionMethod) {
        toast.warn('Wrong decryption option selected!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        return;
      }
      const processedMessage = getEncryptionFunction(option, message, false);
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Generate timestamp
      setMessages([...messages, { sender, text: processedMessage, encryptionMethod: option, timestamp }]);
      if (sender === 'User 2') setUser2Option(''); 
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent, sender: string, message: string, option: string, isEncrypt: boolean) => {
    if (e.key === 'Enter') {
      if (isEncrypt) {
        handleSendMessage(sender, message, option, isEncrypt);
      } else {
        handleDecryption(sender, message, option, messages[messages.length - 1]?.encryptionMethod || '');
      }
      e.preventDefault();
    }
  };

  
    // Function to handle file input change
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files) return;
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string || ""); // Store the image data URL
        };
        reader.readAsDataURL(file); // Convert the file to a data URL
      }
    };

  return (
    <div className='min-h-screen max-h-screen bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-600 '>
      <ToastContainer
        position="top-right"
        limit={2}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
      <h1 className="text-4xl py-2 font-bold text-center">Chat Encrypt/Decrypt Application</h1>
      <div className="p-4 flex justify-center items-center">
        <div className="grid grid-cols-2 gap-4 w-full max-w-6xl">
          <div className="bg-blue-100 p-4 rounded-lg shadow-md">
            <div className='flex justify-between bg-white shadow-lg align-middle px-4 items-center rounded-lg'>
              <h2 className=" text-xl font-bold text-blue-500">Sarah: Encrypter</h2>
              <Image src={user1Avatar} width={60} height={30} className="p-3 rounded-full cursor-pointer" alt="User 1 Avatar" />
            </div>
            
            <div className="flex flex-col space-y-4 h-[60vh] overflow-y-auto">
              {messages.map((message, index) => (
                <div key={index} className={`flex flex-col ${message.sender === 'User 1' ? ` items-end` : ``}`}>
                  <div className={`w-fit max-w-sm h-fit ${message.text === '' ? `p-0` : `p-3`} rounded-lg ${message.sender === 'User 1' ? 'bg-blue-500' : 'bg-green-500'} text-white shadow-md`}>
                    <p className='break-words'>{message.text}</p>
                  </div>
                  <small className={`max-w-fit ${message.text === '' ? `hidden` : `block`}`}>
                    {message.timestamp} {/* Display the timestamp */}
                  </small>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="flex items-center space-x-3 border-t border-gray-300 pt-4">
            <div className="flex items-center">
              <input
                className="form-control hidden"
                type="file"
                id="file-upload"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <MdAttachFile size={25} />
              </label>
            </div>
              <input
                type="text"
                className="w-full p-3 rounded-lg border curso border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type a plaintext..."
                value={user1Message}
                style={{
                  backgroundImage: imagePreview ? `url(${imagePreview})` : "none",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left center",
                  paddingLeft: imagePreview ? "4rem" : "0.5rem", // Adjust padding if image is present
                }}
                onChange={(e) => setUser1Message(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'User 1', user1Message, user1Option, true)}
              />
              <select
                value={user1Option}
                onChange={(e) => setUser1Option(e.target.value)}
                className="p-2 text-xs w-32  rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Encryption</option>
                {/* <option value="aesEncrypt">AES</option> */}
                <option value="caesarCipher">Caesar Cipher</option>
                <option value="columnarEncrypt">Columnar</option>
                {/* <option value="desEncrypt">DES</option> */}
                {/* <option value="generateDiffieHellmanKeys">Generate Diffie Hellman Keys</option> */}
                {/* <option value="dsaSignMessage">DSA</option> */}
                <option value="ecc">ECC</option>
                <option value="sha256Hash">SHA256 Hash</option>
                <option value="hillCipherEncrypt">Hill Cipher</option>
                <option value="monoalphabeticCipher">Mono-Alphabetic Cipher</option>
                <option value="otpEncrypt">OTP</option>
                <option value="playfairEncrypt">Playfair</option>
                {/* <option value="polyalphabeticCipherEncrypt">Polyalphabetic Cipher</option> */}
                <option value="railFenceEncrypt">Rail Fence</option>
                {/* <option value="rc4Encrypt">RC4</option> */}
                {/* <option value="rsaEncrypt">RSA</option> */}
              </select>
              <button
                onClick={() => handleSendMessage('User 1', user1Message, user1Option, true)}
                className="px-4 py-2 text-white bg-blue-500 rounded-lg"
              >
                Send
              </button>
            </div>
          </div>

          <div className="bg-green-100 p-4 rounded-lg shadow-md">
            <div className='flex justify-between bg-white align-middle px-4 items-center rounded-lg shadow-md'>
              <h2 className=" text-xl font-bold text-green-600 ">Bob: Decrypter</h2>
              <Image src={user2Avatar} width={60} height={30} className="p-3 rounded-full cursor-pointer" alt="User 2 Avatar" />
            </div>
            
            <div className="flex flex-col space-y-4 h-[60vh] overflow-y-auto">
              {messages.map((message, index) => (
                <div key={index} className={`flex flex-col ${message.sender === 'User 2' ? ` items-end` : ``}`}>
                  <div className={`w-fit max-w-sm h-fit justify-end ${message.text === '' ? `p-0` : `p-3`} rounded-lg ${message.sender === 'User 2' ? 'bg-green-500 ' : 'bg-blue-500'} text-white shadow-md`}>
                    <p className='break-words'>{message.text}</p>
                  </div>
                  <small className={`max-w-fit ${message.text === '' ? `hidden` : `block`}`}>
                    {message.timestamp} {/* Display the timestamp */}
                  </small>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="flex items-center space-x-3 border-t border-gray-300 pt-4">
              <div className="flex items-center">
                <input
                   className="form-control hidden"
                   type="file"
                   id="file-upload"
                   onChange={handleFileChange}
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <MdAttachFile size={25} />
                </label>
              </div>
              <input
                type="text"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter encrypted message..."
                value={user2Message}
                onChange={(e) => setUser2Message(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'User 2', user2Message, user2Option, false)}
              />
              <select
                value={user2Option}
                onChange={(e) => setUser2Option(e.target.value)}
                className="p-2 text-xs w-32  rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Decryption</option>
                {/* <option value="aesEncrypt">AES</option> */}
                <option value="caesarCipher">Caesar Cipher</option>
                <option value="columnarEncrypt">Columnar</option>
                {/* <option value="desEncrypt">DES</option> */}
                {/* <option value="generateDiffieHellmanKeys">Generate Diffie Hellman Keys</option> */}
                {/* <option value="dsaSignMessage">DSA</option> */}
                <option value="encryptWithPublicKey">ECC</option>
                <option value="sha256Hash">SHA256 Hash</option>
                <option value="hillCipherEncrypt">Hill Cipher</option>
                <option value="monoalphabeticCipher">Mono-Alphabetic Cipher</option>
                <option value="otpEncrypt">OTP</option>
                <option value="playfairEncrypt">Playfair</option>
                {/* <option value="polyalphabeticCipherEncrypt">Polyalphabetic Cipher</option> */}
                <option value="railFenceEncrypt">Rail Fence</option>
                {/* <option value="rc4Encrypt">RC4</option> */}
                {/* <option value="rsaEncrypt">RSA</option> */}
              </select>
              <button
                onClick={() => handleDecryption('User 2', user2Message, user2Option, messages[messages.length - 1]?.encryptionMethod || '')}
                className="px-4 py-2 text-white bg-green-500 rounded-lg"
              >
                Decrypt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
