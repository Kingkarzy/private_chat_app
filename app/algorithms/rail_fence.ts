// Encryption Function
export function railFenceEncrypt(text: string, rails: number): string {
  const fence: string[][] = Array.from({ length: rails }, () => []);
  let rail = 0;
  let direction = 1;

  for (const char of text) {
    fence[rail].push(char);
    rail += direction;

    if (rail === 0 || rail === rails - 1) {
      direction *= -1; // Change direction at the first and last rails
    }
  }

  // Flatten the rails and join them to form the encrypted text
  return fence.flat().join('');
}

// Decryption Function
export function railFenceDecrypt(encryptedText: string, rails: number): string {
  const fence: string[][] = Array.from({ length: rails }, () => []);
  const textLength = encryptedText.length;

  // Step 1: Create a pattern of rails
  let rail = 0;
  let direction = 1;
  const railPattern: number[] = [];

  for (let i = 0; i < textLength; i++) {
    railPattern.push(rail);
    rail += direction;

    if (rail === 0 || rail === rails - 1) {
      direction *= -1; // Change direction at the first and last rails
    }
  }

  // Step 2: Fill the rails with placeholders
  let charIndex = 0;
  railPattern.forEach((r) => {
    if (fence[r].length < railPattern.filter((x) => x === r).length) {
      fence[r].push(encryptedText[charIndex++]);
    }
  });

  // Step 3: Reconstruct the original message
  let result = '';
  rail = 0;
  direction = 1;

  for (let i = 0; i < textLength; i++) {
    result += fence[rail].shift(); // Take the first character from the current rail
    rail += direction;

    if (rail === 0 || rail === rails - 1) {
      direction *= -1; // Change direction at the first and last rails
    }
  }

  return result;
}

// Example Usage
// const text = "HELLO";
// const rails = 3;

// const encrypted = railFenceEncrypt(text, rails);
// console.log("Encrypted:", encrypted); // Expected: "HOLEL"

// const decrypted = railFenceDecrypt(encrypted, rails);
// console.log("Decrypted:", decrypted); // Expected: "HELLO"
