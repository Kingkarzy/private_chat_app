'use client';

import React, { useState } from 'react';
import { playfairEncrypt, playfairDecrypt } from './playfair';
import { toast, ToastContainer } from 'react-toastify';
import Image from 'next/image';
import user1Avatar from '@/assets/user1.png';
import user2Avatar from '@/assets/user2.png';

const Playfair = () => {
  interface Message {
    sender: string;
    text: string;
    key: string;
    timestamp: string;
  }

  const [messages, setMessages] = useState<Message[]>([]);
  const [userMessage, setUserMessage] = useState({ user1: '', user2: '' });
  const [userKey, setUserKey] = useState({ user1: '', user2: '' });

  const processMessage = (message: string, key: string, isEncrypt: boolean) =>
    isEncrypt ? playfairEncrypt(message, key) : playfairDecrypt(message, key);

  const handleSendMessage = (sender: 'user1' | 'user2', message: string, key: string, isEncrypt: boolean) => {
    if (!message.trim() || !key.trim()){
      toast.error('Both message and key are required.'); 
      return;
    } 

    setMessages((prev) => [
      ...prev,
      {
        sender,
        text: processMessage(message, key, isEncrypt),
        key,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);

    setUserMessage((prev) => ({ ...prev, [sender]: '' }));
  };

  return (
    <div className='min-h-screen max-h-full bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-600'>
      <ToastContainer position='top-right' autoClose={3000} theme='dark' limit={3} />
      <h1 className='text-4xl py-2 font-bold text-center'>Chat Encrypt/Decrypt Application</h1>

      <div className='p-4 flex justify-center items-center'>
        <div className='grid grid-cols-2 gap-4 w-full max-w-6xl overflow-auto'>
          {[
            { user: 'user1', label: 'Sarah: Encrypter', color: 'blue', avatar: user1Avatar, isEncrypt: true },
            { user: 'user2', label: 'Bob: Decrypter', color: 'green', avatar: user2Avatar, isEncrypt: false },
          ].map(({ user, label, color, avatar, isEncrypt }) => (
            <div key={user} className={`bg-${color}-100 p-4 rounded-lg shadow-md`}>
              <div className='flex justify-between bg-white shadow-lg px-4 my-3 items-center rounded-lg'>
                <h2 className={`text-xl font-bold text-${color}-500`}>{label}</h2>
                <Image src={avatar} width={60} height={30} className='p-3 rounded-full cursor-pointer' alt={`${label} Avatar`} />
              </div>

              <div className='flex flex-col space-y-4 h-[60vh] overflow-y-auto'>
                {messages.map((message, index) => (
                  <div key={index} className={`flex flex-col ${message.sender === user ? 'items-end' : ''}`}>
                    <div className={`w-fit max-w-sm p-3 rounded-lg bg-${message.sender === user ? color : (color === 'blue' ? 'green' : 'blue')}-500 text-white shadow-md`}>
                      <p className='break-words'>{message.text}</p>
                    </div>
                    <small>{message.timestamp}</small>
                  </div>
                ))}
              </div>

              <div className='flex items-center space-x-3 border-t border-gray-300 pt-4 '>
              <input
                  type="text"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  placeholder={`Type a ${isEncrypt ? 'plaintext' : 'ciphertext'}...`}
                  value={userMessage[user as 'user1' | 'user2']}
                  onChange={(e) => {
                    const newValue = e.target.value;

                    // Check if the new value contains numbers
                    if (/\d/.test(newValue)) {
                      toast.error('Numbers are not allowed!');
                    } else {
                      setUserMessage((prev) => ({ ...prev, [user]: newValue }));
                    }
                  }}
                  onKeyDown={(e) =>
                    e.key === 'Enter' &&
                    handleSendMessage(user as 'user1' | 'user2', userMessage[user as 'user1' | 'user2'], userKey[user as 'user1' | 'user2'], isEncrypt)
                  }
                />

                <input
                  type="text"
                  className="min-w-16 max-w-fit p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter key..."
                  value={userKey[user as 'user1' | 'user2']}
                  onChange={(e) => {
                    const newValue = e.target.value;

                    // Check if the new value contains numbers
                    if (/\d/.test(newValue)) {
                      toast.error('Numbers are not allowed!');
                    } else {
                      setUserKey((prev) => ({ ...prev, [user]: newValue }));
                    }
                  }}
                  onKeyDown={(e) =>
                    e.key === 'Enter' &&
                    handleSendMessage(user as 'user1' | 'user2', userMessage[user as 'user1' | 'user2'], userKey[user as 'user1' | 'user2'], isEncrypt)
                  }
                />
                <button
                  onClick={() => handleSendMessage(user as 'user1' | 'user2', userMessage[user as 'user1' | 'user2'], userKey[user as 'user1' | 'user2'], isEncrypt)}
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

export default Playfair;
