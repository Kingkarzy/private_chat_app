//Diffie-Hellman (DH) Key Exchange

// A method for securely exchanging cryptographic keys over a public channel.

import { createDiffieHellman } from 'crypto';

export function generateDiffieHellmanKeys(): string {
  // Generate first Diffie-Hellman instance with a 2048-bit prime
  const dh1 = createDiffieHellman(2048);
  const dh1Key = dh1.generateKeys(); // Generate public key for the first party

  // Generate second Diffie-Hellman instance with the same prime and generator as the first
  const dh2 = createDiffieHellman(dh1.getPrime(), dh1.getGenerator());
  const dh2Key = dh2.generateKeys(); // Generate public key for the second party

  // Compute shared secrets
  const secret1 = dh1.computeSecret(dh2Key); // First party computes the shared secret
  const secret2 = dh2.computeSecret(dh1Key); // Second party computes the shared secret

  // Check if both secrets match
  return secret1.toString('hex') === secret2.toString('hex') ? "true" : "false";
}

// console.log(generateDiffieHellmanKeys()); // Should return "true" if secrets match

