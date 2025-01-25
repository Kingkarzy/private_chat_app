//AES (Advanced Encryption Standard)

//A symmetric encryption algorithm.
import crypto from 'crypto';

// AES encryption function
export function aesEncrypt(text: string, key: Buffer): string {
  if (key.length !== 32) {
    throw new Error('Key length must be 32 bytes for AES-256-CBC encryption.');
  }

  // Generate a random 16-byte initialization vector (IV)
  const iv = crypto.randomBytes(16);

  // Create the cipher
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

  // Encrypt the text
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  // Return the IV concatenated with the encrypted message, encoded in base64
  return `${iv.toString('base64')}:${encrypted}`;
}

// AES decryption function
export function aesDecrypt(encryptedText: string, key: Buffer): string {
  if (key.length !== 32) {
    throw new Error('Key length must be 32 bytes for AES-256-CBC decryption.');
  }

  // Split the encrypted text into IV and ciphertext
  const [ivBase64, encryptedBase64] = encryptedText.split(':');
  const iv = Buffer.from(ivBase64, 'base64');
  const encrypted:any = Buffer.from(encryptedBase64, 'base64');

  // Create the decipher
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

  // Decrypt the ciphertext
  let decrypted: any = decipher.update(encrypted, 'base64', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

// Example usage:
// const aesKey = crypto.randomBytes(32); // Generate a random 32-byte AES key
// const encryptedMessage = aesEncrypt('HELLO', aesKey);
// console.log('Encrypted Message:', encryptedMessage);

// const decryptedMessage = aesDecrypt(encryptedMessage, aesKey);
// console.log('Decrypted Message:', decryptedMessage);

