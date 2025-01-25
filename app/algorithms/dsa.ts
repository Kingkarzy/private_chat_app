// Digital Signature Algorithm (DSA) for Signature

// A digital signature algorithm.


import { generateKeyPairSync, sign, verify } from 'crypto';


const { publicKey, privateKey } = generateKeyPairSync('dsa', {
    modulusLength: 1024,
    divisorLength: 160,
});


export function dsaSignMessage(message: string, privateKey:string): string {
    const signature = sign(null, Buffer.from(message), privateKey);
    return signature.toString('hex');
}

export function dsaVerifyMessage(message: string, signature: string, publicKey: string): boolean {
    return verify(null, Buffer.from(message), publicKey, Buffer.from(signature, 'hex'));
}

// const message = "HELLO";
// const signature = dsaSignMessage(message, privateKey);

// console.log(signature); // Signature
// console.log(dsaVerifyMessage(message, signature, publicKey)); // true
