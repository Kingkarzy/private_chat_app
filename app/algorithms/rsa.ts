//RSA (Rivest-Shamir-Adleman)

//An asymmetric encryption algorithm.
import  { generateKeyPairSync, publicEncrypt, privateDecrypt } from 'crypto';

const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
});

export function rsaEncrypt(text:any, publicKey:any) {
    return publicEncrypt(publicKey, Buffer.from(text)).toString('base64');
}

export function rsaDecrypt(encrypted:any, privateKey:any) {
    return privateDecrypt(privateKey, Buffer.from(encrypted, 'base64')).toString('utf8');
}

// const encryptedText = rsaEncrypt("HELLO", publicKey);
// console.log(encryptedText); // Encrypted message
// console.log(rsaDecrypt(encryptedText, privateKey)); // Decrypted message