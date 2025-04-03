import { toast } from "react-toastify";

export function otpEncrypt(plaintext: string, key: string): string {
  if (key.length < plaintext.length) {
    toast.error("Key must be at least as long as the plaintext.");
    return '';
  }
  return plaintext.split('').map((char, i) => {
    return String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i));
  }).join('');
}

export function otpDecrypt(ciphertext: string, key: string): string {
  if (key.length < ciphertext.length) {
    throw new Error("Key must be at least as long as the ciphertext.");
  }
  return ciphertext.split('').map((char, i) => {
    return String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i));
  }).join('');
}
