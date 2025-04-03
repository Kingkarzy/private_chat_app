'use client';
import { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!username || !password) {
      toast.error('Both username and password are required.');
      return;
    }
    const storedCredentials = JSON.parse(localStorage.getItem('userCredentials') || '{}');

    function encryptRSA(text: string, n: number, e: number): string {
      const textInt = BigInt(text.split('').map(char => char.charCodeAt(0)).join(''));
      const encryptedText = BigInt(textInt) ** BigInt(e) % BigInt(n);
      console.log(encryptedText.toLocaleString());
      return encryptedText.toLocaleString();
    }

    // Retrieve public and private keys from localStorage
    const publicKey = JSON.parse(localStorage.getItem('publicKey') || '{}');
    const privateKey = JSON.parse(localStorage.getItem('privateKey') || '{}');

    const n = publicKey?.n;
    const e = publicKey?.e;
    const d = privateKey?.d;

    if (!n || !e || !d) {
      toast.error('Public or private keys are missing.');
      return;
    }

    const encryptedUsernamenew = encryptRSA(username || '', n, e);
    const encryptedPasswordnew = encryptRSA(password || '', n, e);

    // Correct the key names here to match the stored data format
    const encryptedUsername = storedCredentials?.encryptusername;
    const encryptedPassword = storedCredentials?.encryptpassword;

    if (!encryptedUsername || !encryptedPassword) {
      toast.error('Encrypted credentials not found in localStorage.');
      return;
    }

    if (encryptedUsernamenew === encryptedUsername && encryptedPasswordnew === encryptedPassword) {
      // Function to decrypt using RSA
      function decryptRSA(encryptedText: string, n: number, d: number): string {
        const encryptedBigInt = BigInt(encryptedText);
        const decryptedBigInt = encryptedBigInt ** BigInt(d) % BigInt(n);
        const decryptedText = decryptedBigInt.toString();
        return decryptedText;
      }

      const decryptedUsername = decryptRSA(encryptedUsername, n, d);
      const decryptedPassword = decryptRSA(encryptedPassword, n, d);
      
      if (decryptedUsername && decryptedPassword) {
        toast.success('Login successful!');
        localStorage.setItem('userDecryptedCredentials', JSON.stringify({
          decryptedUser: decryptedUsername,
          decryptedPassword: decryptedPassword,
        }));
        window.location.href = '/algorithms/rsa/securechat'; // Redirect to chat page
      } else {
        toast.error('Decryption failed.');
      }
    } else {
      toast.error("Encrypted data mismatch.");
    }
  };

  return (
    <div className='flex flex-col space-y-4 justify-center items-center w-full h-screen bg-slate-300'>
      <ToastContainer position='top-right' autoClose={3000} theme='dark' />
      <h1>Login Using RSA Decryption</h1>
      <form className='flex flex-col space-y-4' onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(event);
      }}>
        <label>Username: &emsp;
          <input type="text" placeholder="Username" maxLength={10} value={username} onChange={(e) => setUsername(e.target.value)} className='rounded-md py-2 px-4' required />
        </label>
        <label>Password: &emsp;
          <input type="password" placeholder="Password" maxLength={10} value={password} onChange={(e) => setPassword(e.target.value)} className='rounded-md py-2 px-4' required />
        </label>
        <button type="submit" className='bg-blue-600 rounded-md text-white py-1 px-2 hover:scale-105'>Login</button>
        <p className='text-sm text-gray-500'> Don&apos;t have an account? <a href="/algorithms/rsa/register" className='text-blue-600'>Register</a></p>
      </form>
    </div>
  );
}

export default LoginPage;
