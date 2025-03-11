//ECC (Elliptic Curve Cryptography)

// An encryption technique based on elliptic curve theory.
import * as crypto from 'crypto';
import { ec as EC } from 'elliptic';

const ec = new EC('secp256k1');

function generateKeyPair() {
  const key = ec.genKeyPair();
  const publicKey = key.getPublic('hex');
  const privateKey = key.getPrivate('hex');
  
  return { publicKey, privateKey };
}

const { publicKey, privateKey } = generateKeyPair();



export function encryptWithPublicKey( message: string): string {
  const buffer = Buffer.from(message, 'utf8');
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString('hex');
}

export function decryptWithPrivateKey(encryptedMessage: string): string {
  const key = ec.keyFromPrivate(privateKey, 'hex');
  const buffer = Buffer.from(encryptedMessage, 'hex');
  const decrypted = crypto.privateDecrypt({ key: key.getPrivate('hex'), passphrase: '' }, buffer);
  const decryptedMessage = decrypted.toString('utf8');
  return decryptedMessage;
}

// const { publicKey, privateKey } = generateKeyPair();
// const message = "Hello, Elliptic Curve!";

// const encryptedMessage = encryptWithPublicKey(message);
// console.log("Encrypted Message: ", encryptedMessage);

// const decryptedMessage = decryptWithPrivateKey(encryptedMessage);
// console.log("Decrypted Message: ", decryptedMessage);
