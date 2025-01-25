//RC4 (Rivest Cipher 4)

//A stream cipher.
import crypto from 'crypto';

export function rc4Encrypt(text: string, key: string): string {
  const cipher = crypto.createCipheriv('rc4', Buffer.from(key), null);
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}

export function rc4Decrypt(encryptedText: string, key: string): string {
  const decipher = crypto.createDecipheriv('rc4', Buffer.from(key), null);
  let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Example usage:
// const key = "secretkey";
// const encrypted = rc4Encrypt("HELLO", key);
// console.log("Encrypted:", encrypted);

// const decrypted = rc4Decrypt(encrypted, key);
// console.log("Decrypted:", decrypted); // Outputs: HELLO
