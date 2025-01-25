/**
 * A substitution cipher that uses multiple 
 * substitution alphabets to encrypt the plaintext.
 * 
 */

export function polyalphabeticCipherEncrypt(text: string, key: string): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    key = key.toUpperCase();
  
    return text
      .toUpperCase()
      .split('')
      .map((char, i) => {
        const index = alphabet.indexOf(char);
        if (index === -1) return char; // Non-alphabet characters remain unchanged
        const shift = alphabet.indexOf(key[i % key.length]);
        return alphabet[(index + shift) % 26];
      })
      .join('');
  }
  
  export function polyalphabeticCipherDecrypt(encryptedText: string, key: string): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    key = key.toUpperCase();
  
    return encryptedText
      .toUpperCase()
      .split('')
      .map((char, i) => {
        const index = alphabet.indexOf(char);
        if (index === -1) return char; // Non-alphabet characters remain unchanged
        const shift = alphabet.indexOf(key[i % key.length]);
        return alphabet[(index - shift + 26) % 26]; // +26 ensures we don't get a negative index
      })
      .join('');
  }
  
  // Example Usage
  // const text = "HELLO WORLD";
  // const key = "KEY";
  
  // const encrypted = polyalphabeticCipherEncrypt(text, key);
  // console.log("Encrypted:", encrypted); // Example: "RIJVS UYVJN"
  
  // const decrypted = polyalphabeticCipherDecrypt(encrypted, key);
  // console.log("Decrypted:", decrypted); // Expected: "HELLO WORLD"
  
