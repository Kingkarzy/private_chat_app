/**
 * A substitution cipher where each letter of 
 * the plaintext is mapped to a letter in a fixed substitution alphabet.
 */

export function monoalphabeticCipher(text: string, key: string): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    key = key.toUpperCase();

    return text.toUpperCase().split('').map((c) => {
        let index = alphabet.indexOf(c);
        return index !== -1 ? key[index] : c;
    }).join('');
}

export function monoalphabeticDecrypt(ciphertext: string, key: string): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    key = key.toUpperCase();

    return ciphertext.toUpperCase().split('').map((c) => {
        let index = key.indexOf(c);
        return index !== -1 ? alphabet[index] : c;
    }).join('');
}

// Example Usage
// const plaintext = "HELLO";
// const key = "QAZWSXEDCRFVTGBYHNUJMIKOLP"; // The substitution alphabet key

// // Encrypt the plaintext
// const encrypted = monoalphabeticCipher(plaintext, key);
// console.log('Encrypted:', encrypted); // Outputs the encrypted text

// // Decrypt the ciphertext
// const decrypted = monoalphabeticDecrypt(encrypted, key);
// console.log('Decrypted:', decrypted); // Outputs: "HELLO"
