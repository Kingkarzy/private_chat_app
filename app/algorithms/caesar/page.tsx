'use client';

import React, { useState, useRef } from 'react';
import { caesarCipher, caesarDecipher } from './caesar_cipher';
import { ToastContainer } from 'react-toastify';
import Image from 'next/image';
import user1Avatar from '@/assets/user1.png';
import user2Avatar from '@/assets/user2.png';

const Caesar = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string; shift: number; timestamp: string }[]>([]);
  const [userMessage, setUserMessage] = useState({ user1: '', user2: '' });
  const [shiftValue, setShiftValue] = useState('');
  const chatEndRef = useRef(null);

  const processMessage = (message: string, shift: number, isEncrypt: boolean) => {
    return isEncrypt ? caesarCipher(message, shift) : caesarDecipher(message, shift);
  };

  const handleSendMessage = (sender: string, message: string, shift: string, isEncrypt: boolean) => {
    if (!message.trim() || !shift) return;
    const processedMessage = processMessage(message, Number(shift), isEncrypt);
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages([...messages, { sender, text: processedMessage, shift: Number(shift), timestamp }]);
    setUserMessage((prev) => ({ ...prev, [sender]: '' }));
  };

  const handleKeyDown = (e: React.KeyboardEvent, sender: string, message: string, isEncrypt: boolean) => {
    if (e.key === 'Enter') {
      handleSendMessage(sender, message, shiftValue, isEncrypt);
      e.preventDefault();
    }
  };

  return (
    <div className='min-h-screen max-h-screen bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-600'>
      <ToastContainer position='top-right' autoClose={3000} theme='dark' />
      <h1 className='text-4xl py-2 font-bold text-center'>Chat Encrypt/Decrypt Application</h1>
      <div className='p-4 flex justify-center items-center'>
        <div className='grid grid-cols-2 gap-4 w-full max-w-6xl'>
          {[{ user: 'user1', label: 'Sarah: Encrypter', color: 'blue', avatar: user1Avatar, isEncrypt: true },
            { user: 'user2', label: 'Bob: Decrypter', color: 'green', avatar: user2Avatar, isEncrypt: false }].map(({ user, label, color, avatar, isEncrypt }) => (
            <div key={user} className={`bg-${color}-100 p-4 rounded-lg shadow-md`}>
              <div className='flex justify-between bg-white shadow-lg align-middle px-4  my-3 items-center rounded-lg'>
                <h2 className={`text-xl font-bold text-${color}-500`}>{label}</h2>
                <Image src={avatar} width={60} height={30} className='p-3 rounded-full cursor-pointer' alt={`${label} Avatar`} />
              </div>
              <div className='flex flex-col space-y-4 h-[60vh] overflow-y-auto'>
                {messages.map((message, index) => (
                  <div key={index} className={`flex flex-col ${message.sender === user ? 'items-end' : ''}`}>
                    <div className={`w-fit max-w-sm h-fit p-3 rounded-lg bg-${message.sender === user ? color : 'blue'}-500 text-white shadow-md`}>
                      <p className='break-words'>{message.text}</p>
                    </div>
                    <small>{message.timestamp}</small>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div className='flex items-center space-x-3 border-t border-gray-300 pt-4'>
              
                <input
                  type='text'
                  className='w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500'
                  placeholder={`Type a ${isEncrypt ? 'plaintext' : 'ciphertext'}...`}
                  value={userMessage[user as 'user1' | 'user2']}
                  onChange={(e) => setUserMessage((prev) => ({ ...prev, [user]: e.target.value }))}
                  onKeyDown={(e) => handleKeyDown(e, user as 'user1' | 'user2', userMessage[user as 'user1' | 'user2'], isEncrypt)}
                />
                <input
                  type='number'
                  className='w-20 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500'
                  placeholder='Shift value...'
                  value={shiftValue}
                  max={25}
                  min={1}
                  onChange={(e) => setShiftValue(e.target.value)}
                />
                <button
                  onClick={() => handleSendMessage(user, userMessage[user as 'user1' | 'user2'], shiftValue, isEncrypt)}
                  className={`px-4 py-2 text-white bg-${color}-500 rounded-lg`}
                >
                  {isEncrypt ? 'Send' : 'Decrypt'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Caesar;
