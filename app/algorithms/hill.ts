//A polygraphic substitution cipher that uses linear algebra.

/**Hill cipher implementation requires a 2x2 or 3x3 key matrix and linear algebra operations.
 * Simplified example for a 2x2 matrix:  
*/

export function hillCipherEncrypt(text: string, keyMatrix: number[][]): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    text = text.toUpperCase().replace(/[^A-Z]/g, ''); // Remove non-alphabet characters

    // Ensure even number of characters (add 'X' if odd)
    if (text.length % 2 !== 0) text += 'X';

    let result = '';
    for (let i = 0; i < text.length; i += 2) {
        const a = alphabet.indexOf(text[i]);
        const b = alphabet.indexOf(text[i + 1]);

        // Matrix multiplication (mod 26)
        const x = (keyMatrix[0][0] * a + keyMatrix[0][1] * b) % 26;
        const y = (keyMatrix[1][0] * a + keyMatrix[1][1] * b) % 26;
        
        result += alphabet[x] + alphabet[y];
    }
    return result;
}

// Function to compute the modular inverse of a number mod 26
function modInverse(a: number, m: number): number {
    for (let i = 1; i < m; i++) {
        if ((a * i) % m === 1) return i;
    }
    return -1; // If no modular inverse exists
}

export function hillCipherDecrypt(ciphertext: string, keyMatrix: number[][]): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Find the inverse of the keyMatrix (mod 26)
    const determinant = (keyMatrix[0][0] * keyMatrix[1][1] - keyMatrix[0][1] * keyMatrix[1][0]) % 26;
    const invDeterminant = modInverse(determinant, 26);

    if (invDeterminant === -1) {
        throw new Error("The matrix is not invertible mod 26.");
    }

    // Compute the inverse keyMatrix (mod 26)
    const inverseMatrix = [
        [keyMatrix[1][1] * invDeterminant % 26, -keyMatrix[0][1] * invDeterminant % 26],
        [-keyMatrix[1][0] * invDeterminant % 26, keyMatrix[0][0] * invDeterminant % 26]
    ];

    // Ensure the values are positive
    inverseMatrix.forEach((row, i) => {
        row.forEach((value, j) => {
            inverseMatrix[i][j] = (value + 26) % 26;
        });
    });

    // Decrypting the message using the inverse keyMatrix
    let result = '';
    for (let i = 0; i < ciphertext.length; i += 2) {
        const a = alphabet.indexOf(ciphertext[i]);
        const b = alphabet.indexOf(ciphertext[i + 1]);

        // Matrix multiplication (mod 26)
        const x = (inverseMatrix[0][0] * a + inverseMatrix[0][1] * b) % 26;
        const y = (inverseMatrix[1][0] * a + inverseMatrix[1][1] * b) % 26;

        result += alphabet[x] + alphabet[y];
    }
    return result;
}

// Example Usage
// const text = "HELLO";
// const keyMatrix = [
//     [6, 24],  // Example matrix for encryption
//     [1, 16]
// ];

// Encrypt the plaintext
// const encryptedText = hillCipherEncrypt(text, keyMatrix);
// console.log('Encrypted:', encryptedText); // Encrypted message

// // Decrypt the ciphertext
// const decryptedText = hillCipherDecrypt(encryptedText, keyMatrix);
// console.log('Decrypted:', decryptedText); // Decrypted message (should return "HELLO")