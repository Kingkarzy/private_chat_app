// Hashing (SHA) for Integrity Checking

// A cryptographic hash function

import { createHash } from 'crypto';

export function sha256Hash(text: string): string {
  return createHash('sha256').update(text).digest('hex');
}

// console.log(sha256Hash("HELLO")); // Hashed message
