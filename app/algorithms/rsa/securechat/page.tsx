'use client';

import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Image from 'next/image';
import user1Avatar from '@/assets/user1.png';
import user2Avatar from '@/assets/user2.png';

const Chat = () => {
  interface Message {
    sender: string;
    text: string;
    timestamp: string;
  }

  const [messages, setMessages] = useState<Message[]>([]);
  const [userMessage, setUserMessage] = useState({ user1: '', user2: '' });

  const handleSendMessage = (sender: 'user1' | 'user2', message: string) => {
    if (!message.trim()) return;
    setUserMessage((prev) => ({ ...prev, [sender]: '' }));
    // Add message to chat history
    const timestamp = new Date().toLocaleTimeString();
    setMessages((prev) => [
      ...prev,
      { sender, text: message, timestamp }
    ]);
  };

  useEffect(() => {
    const storedCredentials = JSON.parse(localStorage.getItem('userCredentials') || '{}');
    const userDecryptedCredentials = JSON.parse(localStorage.getItem('userDecryptedCredentials') || '{}');
    if (!userDecryptedCredentials && !storedCredentials) {
      toast.error('User credentials not found in localStorage.');
      window.location.href = '/algorithms/rsa'; // Redirect to login page
      return;
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-600">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      <h1 className="text-4xl py-2 font-bold text-center text-white">Chat Encrypt/Decrypt Application</h1>

      <div className="p-4 flex justify-center items-center">
        <div className="grid grid-cols-2 gap-4 w-full max-w-6xl overflow-auto">
          {[
            { user: 'user1', label: 'Sarah: Sender', color: 'blue', avatar: user1Avatar, isEncrypt: true },
            { user: 'user2', label: 'Bob: Receiver', color: 'green', avatar: user2Avatar, isEncrypt: true },
          ].map(({ user, label, color, avatar, isEncrypt }) => (
            <div key={user} className={`bg-${color}-100 p-4 rounded-lg shadow-md`}>
              <div className="flex justify-between bg-white shadow-lg px-4 my-3 items-center rounded-lg">
                <h2 className={`text-xl font-bold text-${color}-500`}>{label}</h2>
                <Image src={avatar} width={60} height={60} className="p-3 rounded-full cursor-pointer" alt={`${label} Avatar`} />
              </div>

              <div className="flex flex-col space-y-4 h-[60vh] overflow-y-auto mb-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex flex-col ${message.sender === user ? 'items-end' : ''}`}>
                    <div className={`w-fit max-w-sm p-3 rounded-lg bg-${message.sender === user ? color : (color === 'blue' ? 'green' : 'blue')}-500 text-white shadow-md`}>
                      <p className="break-words">{message.text}</p>
                    </div>
                    <small className="pt-1 text-xs text-black">{message.timestamp}</small>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-3 border-t border-gray-300 pt-4">
                <input
                  type="text"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  placeholder={`Type a ${isEncrypt ? 'plaintext' : 'ciphertext'}...`}
                  value={userMessage[user as 'user1' | 'user2']}
                  onChange={(e) => setUserMessage((prev) => ({ ...prev, [user]: e.target.value }))}
                  onKeyDown={(e) =>
                    e.key === 'Enter' &&
                    handleSendMessage(user as 'user1' | 'user2', userMessage[user as 'user1' | 'user2'])
                  }
                />
                <button
                  onClick={() => handleSendMessage(user as 'user1' | 'user2', userMessage[user as 'user1' | 'user2'])}
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

export default Chat;
