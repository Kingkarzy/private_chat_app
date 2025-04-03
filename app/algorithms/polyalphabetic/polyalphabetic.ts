/**
 * A substitution cipher that uses multiple 
 * substitution alphabets to encrypt the plaintext.
 * 
 * iN THIS LAB I USED A FIXED KEY AND ALPHABETIC TABLE AS REPRESENTED IN THE CLASS SLIDES TO ENCRYPT AND DECRYPT THE TEXT
 * 
 */

export function polyalphabeticCipherEncrypt(text: string): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const key = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
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
  
  export function polyalphabeticCipherDecrypt(encryptedText: string): string {

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const key = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
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
