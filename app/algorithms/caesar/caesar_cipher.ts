/** 
 * 
 * A simple substitution cipher where each letter in the 
 * plaintext is shifted a certain number of places down the alphabet.
*/

export function caesarCipher(str: string, shift: number): string {
    return str.replace(/[a-z]/gi, (char: string) => {
        const start = char <= 'Z' ? 65 : 97;
        return String.fromCharCode(start + (char.charCodeAt(0) - start + shift) % 26);
    });
}

export function caesarDecipher(str: string, shift: number): string {
    return str.replace(/[a-z]/gi, (char: string) => {
        const start = char <= 'Z' ? 65 : 97;
        return String.fromCharCode(start + (char.charCodeAt(0) - start - shift + 26) % 26); // Reverse shift
    });
}
