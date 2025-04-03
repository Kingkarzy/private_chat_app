'use client';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    localStorage.removeItem('userCredentials');
    localStorage.removeItem('userDecryptedCredentials');
    localStorage.removeItem('publicKey'); 
    localStorage.removeItem('privateKey'); 
  }, []);
  

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validate input
    if (!username || !password) {
      toast.error('Both username and password are required.');
      return;
    }


    // Generate Randoom Prime Numbers for RSA

    // function isPrime(num: number): boolean {
    //   if (num < 2) return false;
    //   for (let i = 2; i <= Math.sqrt(num); i++) {
    //     if (num % i === 0) return false;
    //   }
    //   return true;
    // }

    // function getTwoRandomPrimes(): [number, number] {
    //   let prime1: number, prime2: number;
    //   do {
    //     prime1 = Math.floor(Math.random() * 9) + 1;
    //   } while (!isPrime(prime1));

    //   do {
    //     prime2 = Math.floor(Math.random() * 9) + 1;
    //   } while (!isPrime(prime2) || prime2 === prime1);

    //   return [prime1, prime2];
    // }

    // const [prime1, prime2] = getTwoRandomPrimes();
    
    // Giving defialt prime number for auth

    const n = 19 * 17;
    const phi = (19 - 1) * (17 - 1);
    const e = 13; // Common choice for e

    function findModInverse(a: number, m: number): number {
        const m0 = m;
        let y = 0, x = 1;
    
        if (m === 1) return 0;
    
        while (a > 1) {
          const q = Math.floor(a / m);
          let t = m;
    
          m = a % m;
          a = t;
          t = y;
    
          y = x - q * y;
          x = t;
        }
    
        if (x < 0) x += m0;
    
        return x;
      }

    const d = findModInverse(e, phi);

    localStorage.setItem('publicKey', JSON.stringify({ n, e }));
    localStorage.setItem('privateKey', JSON.stringify({ n, d }));

    function encryptRSA(text: string, n: number, e: number): string {
      const textInt = BigInt(text.split('').map(char => char.charCodeAt(0)).join(''));
      
      const encryptedText = BigInt(textInt) ** BigInt(e) % BigInt(n);
      // console.log(encryptedText.toLocaleString());
      return encryptedText.toLocaleString();

    }

    const encryptedUsername = encryptRSA(username, n, e);
    const encryptedPassword = encryptRSA(password, n, e);
    try {
      localStorage.setItem('userCredentials', JSON.stringify({
        encryptusername: encryptedUsername.toString(),
        encryptpassword: encryptedPassword.toString(),
        username: username,
        password: password,
      }));
      toast.success('Registration successful!');
      window.location.href = '/algorithms/rsa';
    } catch (error) {
      console.log(error);
      toast.error('An error occurred while saving your credentials.');
    }

  };

  return (
    <div className='flex flex-col space-y-4 justify-center items-center w-full h-screen bg-slate-300'>
       <ToastContainer position='top-right' autoClose={3000} theme='dark' />
      <h1>Register Using RSA Encryption</h1>
      <form className='flex flex-col space-y-4' onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(event);
      }}>
        <input type="text" placeholder="Username" maxLength={10} value={username} onChange={(e) => setUsername(e.target.value)} className='rounded-md py-2 px-4 bg-white' required/>
        <input type="password" placeholder="Password"  maxLength={10} value={password} onChange={(e) => setPassword(e.target.value)} className='rounded-md py-2 px-4 border-2 bg-white' required />
        <input type="text" className='rounded-md py-2 px-4' hidden />
        <button type="submit" className='bg-blue-600 rounded-md text-white py-1 px-2 hover:scale-105'>Register</button>
        <p className='text-sm text-gray-500'> Already have an account? <a href="/algorithms/rsa" className='text-blue-600 '>Login</a></p>
      </form>
    </div>
  );
}

export default RegisterPage;
