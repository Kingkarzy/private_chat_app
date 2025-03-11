/** 
 * 
 * A simple substitution cipher where each letter in the 
 * plaintext is keyed a certain number of places down the alphabet.
*/

export function monoalphabeticCipher(str: string, key: number): string {
    return str.replace(/[a-z]/gi, (char: string) => {
        const start = char <= 'Z' ? 65 : 97;
        return String.fromCharCode(start + (char.charCodeAt(0) - start + key) % 26);
    });
}

export function monoalphabeticDecrypt(str: string, key: number): string {
    return str.replace(/[a-z]/gi, (char: string) => {
        const start = char <= 'Z' ? 65 : 97;
        return String.fromCharCode(start + (char.charCodeAt(0) - start - key + 26) % 26); // Reverse key
    });
}

// Example usage
// const plaintext = "HELLO WORLD";
// const key = 3;

// const encryptedMessage = monoalphabetic(plaintext, key);
// console.log("Encrypted Message:", encryptedMessage); // Encrypted message

// const decryptedMessage = caesarDecipher(encryptedMessage, key);
// console.log("Decrypted Message:", decryptedMessage); // Decrypted message


// console.log(monoalphabetic("HELLO", 3)); // KHOOR