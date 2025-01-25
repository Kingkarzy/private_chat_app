//DES (Data Encryption Standard)

//A symmetric-key algorithm for the encryption of digital data.

import crypto from 'crypto';

// Encryption function for DES
export function desEncrypt(text: string, key: string): string {
    // Ensure the key is 8 bytes (DES key size)
    if (key.length !== 8) {
        throw new Error("Key must be 8 bytes in length");
    }

    // Create a cipher object using DES algorithm (des-ede is a variant of DES)
    const cipher:any = crypto.createCipheriv('aes-256-ecb', Buffer.from(key, 'utf8'), null);

    // Encrypt the message
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

// Decryption function for DES
export function desDecrypt(encryptedText: string, key: string): string {
    // Ensure the key is 8 bytes (DES key size)
    if (key.length !== 8) {
        throw new Error("Key must be 8 bytes in length");
    }

    // Create a decipher object using DES algorithm (des-ede)
    const decipher = crypto.createDecipheriv('aes-256-ecb', Buffer.from(key, 'utf8'), null);

    // Decrypt the message
    let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

// Example usage:
// const key = "12345678"; // Must be 8 bytes long
// const plaintext = "HELLO DES";

// // Encrypt the message
// const encryptedMessage = desEncrypt(plaintext, key);
// console.log("Encrypted Message:", encryptedMessage); // Encrypted message

// // Decrypt the message
// const decryptedMessage = desDecrypt(encryptedMessage, key);
// console.log("Decrypted Message:", decryptedMessage); // Decrypted message
