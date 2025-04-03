//Diffie-Hellman (DH) Key Exchange

// A method for securely exchanging cryptographic keys over a public channel.


// The Diffie-Hellman key exchange method allows two parties to establish a shared secret key over an insecure channel.

'use client';

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image';
import user1Avatar from '@/assets/user1.png';
import user2Avatar from '@/assets/user2.png';

const Diffie = () => {
  // Fixed established keys
  const g = 5;
  const p = 157;   //larger number

  // State for private keys and shared keys
  const [xa, setXa] = useState<number | null>(null);
  const [xb, setXb] = useState<number | null>(null);
  const [sharedKeyA, setSharedKeyA] = useState<number | null>(null);
  const [sharedKeyB, setSharedKeyB] = useState<number | null>(null);

  function generateKeyA(xa: number) {
    const ya = (Math.pow(g, xa)) % p;
    const key = xb !== null ? (Math.pow(ya, xb)) % p : null;
    if (key !== null && (isNaN(key) || key >= 1000)){
      toast.error('Shared key is too large');
      return;
    }
    return Number(key);
  }

  function generateKeyB(xb: number) {
    const yb = (g ** xb);
    const key = xa !== null ? (Math.pow(yb, xa)) % p : null;
    if (key !== null && (isNaN(key) || key >= 1000)){
      toast.error('Shared key is too large');
      return;
    }
    return Number(key);
  }

  // Handle Key Exchange for User 1
  const handleUser1KeyExchange = () => {
    if (xa === null) {
      toast.error('Please enter a private key for User 1');
      return;
    }
    const key = generateKeyA(xa);
    setSharedKeyA(key);
  };

  // Handle Key Exchange for User 2
  const handleUser2KeyExchange = () => {
    if (xb === null) {
      toast.error('Please enter a private key for User 2');
      return;
    }
    const key = generateKeyB(xb);
    setSharedKeyB(key);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-600 p-6 flex flex-col items-center">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      <h1 className="text-4xl font-bold text-center text-white mb-6">Diffie-Hellman Key Exchange</h1>

      <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
        {[
          { user: 'user1', label: 'User 1 (Sarah)', color: 'blue', avatar: user1Avatar, privateKey: xa, setPrivateKey: setXa, sharedKey: sharedKeyA, handleKeyExchange: handleUser1KeyExchange },
          { user: 'user2', label: 'User 2 (Bob)', color: 'green', avatar: user2Avatar, privateKey: xb, setPrivateKey: setXb, sharedKey: sharedKeyB, handleKeyExchange: handleUser2KeyExchange },
        ].map(({ user, label, color, avatar, privateKey, setPrivateKey, sharedKey, handleKeyExchange }) => (
          <div key={user} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <Image src={avatar} width={60} height={60} className="rounded-full mb-3" alt={`${label} Avatar`} />
            <h2 className={`text-xl font-bold text-${color}-600 mb-4`}>{label}</h2>

            <input
              type="number"
              className="w-full p-2 border rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter Private Key"
              value={privateKey || ''}
              onChange={(e) => setPrivateKey(parseInt(e.target.value, 10) || null)}
            />

            <button
              onClick={handleKeyExchange}
              className={`w-full mt-4 px-4 py-2 text-white bg-${color}-500 rounded-lg`}
            >
              Generate Shared Key
            </button>

            {sharedKey !== null && (
              <p className="mt-3 text-lg font-semibold text-gray-700">
                Shared Key: <span className="text-indigo-600">{sharedKey}</span>
              </p>
            )}
          </div>
        ))}
      </div>

      {sharedKeyA !== null && sharedKeyB !== null && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md text-center">
          {sharedKeyA === sharedKeyB ? (
            <p className="text-lg font-bold text-green-600">✅ Key Exchange Successful! Both users have the same key.</p>
          ) : (
            <p className="text-lg font-bold text-red-600">❌ Key Exchange Failed! Keys do not match.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Diffie;

