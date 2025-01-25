//An encryption technique that cannot be cracked if the key is truly random and used only once.

export function otpEncrypt(plaintext: string, key: string): string {
    if (key.length < plaintext.length) {
      throw new Error("Key must be at least as long as the plaintext.");
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
  
  // Example Usage
  // const plaintext = "HELLO";
  // const otpKey = "XMCKL"; // Must be random and at least as long as the plaintext
  
  // // Encrypt the plaintext
  // const encrypted = otpEncrypt(plaintext, otpKey);
  // console.log('Encrypted:', encrypted); // Outputs encrypted text (garbled/unreadable)
  
  // // Decrypt the ciphertext
  // const decrypted = otpDecrypt(encrypted, otpKey);
  // console.log('Decrypted:', decrypted); // Outputs: "HELLO"
  
  