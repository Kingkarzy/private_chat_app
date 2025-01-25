//ECC (Elliptic Curve Cryptography)

// An encryption technique based on elliptic curve theory.

var EC = require('elliptic').ec;

const ec = new EC('secp256k1');

function generateKeyPair() {
  const key = EC.genKeyPair();
  const publicKey = key.getPublic('hex');
  const privateKey = key.getPrivate('hex');
  
  return { publicKey, privateKey };
}

export function encryptWithPublicKey(publicKey: string, message: string): string {
  const key = EC.keyFromPublic(publicKey, 'hex');
  const encryptedMessage = key.encrypt(message, 'hex');
  return encryptedMessage;
}

export function decryptWithPrivateKey(privateKey: string, encryptedMessage: string): string {
  const key = EC.keyFromPrivate(privateKey, 'hex');
  const decryptedMessage = key.decrypt(encryptedMessage, 'utf8');
  return decryptedMessage;
}

// const { publicKey, privateKey } = generateKeyPair();
// const message = "Hello, Elliptic Curve!";

// const encryptedMessage = encryptWithPublicKey(publicKey, message);
// console.log("Encrypted Message: ", encryptedMessage);

// const decryptedMessage = decryptWithPrivateKey(privateKey, encryptedMessage);
// console.log("Decrypted Message: ", decryptedMessage);
