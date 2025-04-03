'use client';

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image';
import user1Avatar from '@/assets/user1.png';
import user2Avatar from '@/assets/user2.png';

const codebook = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "`", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "=", "_", "+", "[", "]", "{", "}", "|", "\\", ";", ":", "'", "\"", ",", ".", "<", ">", "/", "?", " ", "\n", "\r", "\t", "–", "—"
];

const encode = (text: string): string => {
  return text.split('').map((char) => {
    const index = codebook.indexOf(char);
    if (index !== -1) {
      return index.toString().padStart(2, '0');
    }
    return '';
  }).join('');
};

const decode = (encodedText: string): string => {
  let decoded = '';
  for (let i = 0; i < encodedText.length; i += 2) {
    const index = parseInt(encodedText.substr(i, 2), 10);
    decoded += codebook[index] || '';
  }
  return decoded;
};

const otp = (message: string, key: string, mode: 'encrypt' | 'decrypt', keyRepetition: boolean): string => {



  if (!message || !key) {
    return "Error: The message and key must not be empty.";
  }

  let codeMessage: string;
  let codeKey = encode(key);

  if (mode === "encrypt") {
    codeMessage = encode(message);
  } else {
    if (!/^[0-9]+$/.test(message)) {
      return "Error: When decrypting, the message must only contain numbers.";
    }
    codeMessage = message;
  }

  if (codeKey.length < codeMessage.length) {
    if (keyRepetition) {
      while (codeKey.length < codeMessage.length) {
        codeKey += codeKey;
      }
    } else {
      return "Error: The key is shorter than the message.";
    }
  }

  const codeOutput: number[] = [];
  const codeMessageArr = codeMessage.split('').map(Number);
  const codeKeyArr = codeKey.split('').map(Number);

  for (let i = 0; i < codeMessageArr.length; i++) {
    if (mode === "encrypt") {
      const sum = (codeMessageArr[i] + codeKeyArr[i]) % 10;
      codeOutput.push(sum);
    } else {
      const diff = (codeMessageArr[i] - codeKeyArr[i] + 10) % 10;
      codeOutput.push(diff);
    }
  }

  return mode === "decrypt" ? decode(codeOutput.join("")) : codeOutput.join("");
};

interface Message {
  sender: string;
  text: string;
  timestamp: string;
}

const Otp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMessage, setUserMessage] = useState<{ user1: string; user2: string }>({ user1: '', user2: '' });
  const [key, setKey] = useState<string>('');

  const handleSendMessage = (sender: 'user1' | 'user2', message: string, isEncrypt: boolean) => {
    if (!message.trim() || !key.trim()) return;
    const processedMessage = otp(message, key, isEncrypt ? 'encrypt' : 'decrypt', true);
    setMessages((prev) => [...prev, { sender, text: processedMessage, timestamp: new Date().toLocaleTimeString() }]);
    setUserMessage((prev) => ({ ...prev, [sender]: '' }));
  };

  useEffect(() => {
    
    const interval = setInterval(() => {
      toast.info('Please change your key!', { autoClose: 1500,  });  
    }, 20000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className='min-h-fit max-h-fit bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-600'>
      <ToastContainer position='top-right' autoClose={3000} theme='dark' />
      <h1 className='text-3xl py-2 font-bold text-center'>Chat Encrypt/Decrypt Application</h1>
      <div className='p-3 flex justify-center items-center'>
        <input
          type='text'
          className='p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500'
          placeholder='Enter Secret Key'
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </div>
      <div className='p-4 flex justify-center items-center'>
        <div className='grid grid-cols-2 gap-4 w-full max-w-4xl overflow-auto'>
          {[{ user: 'user1', label: 'Sarah: Encrypter', color: 'blue', avatar: user1Avatar, isEncrypt: true },
            { user: 'user2', label: 'Bob: Decrypter', color: 'green', avatar: user2Avatar, isEncrypt: false }]
            .map(({ user, label, color, avatar, isEncrypt }) => (
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
                
                <div className='flex items-center space-x-3 border-t border-gray-300 pt-4'>
                  <input
                    type='text'
                    className='w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500'
                    placeholder={`Type a ${isEncrypt ? 'plaintext' : 'ciphertext'}...`}
                    value={ // @ts-expect-error userMessage is indexed by dynamic keys
                    userMessage[user]}
                    onChange={(e) => setUserMessage((prev) => ({ ...prev, [user]: e.target.value }))}
                  />
                  <button
                    onClick={// @ts-expect-error  userMessage is indexed by dynamic keys
                    () => handleSendMessage(user, userMessage[user], isEncrypt)}
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

export default Otp;
