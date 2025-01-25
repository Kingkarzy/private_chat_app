export function columnarEncrypt(text: string, key: string): string {
  const columns: string[][] = Array.from({ length: key.length }, () => []);

  // Create order based on key, sorted alphabetically
  const order = key
      .split('')
      .map((char, i) => ({ char, index: i }))
      .sort((a, b) => a.char.localeCompare(b.char))
      .map(obj => obj.index);

  // Fill columns with the text in a grid
  for (let i = 0; i < text.length; i++) {
      columns[i % key.length].push(text[i]);
  }

  // Read columns based on sorted key order
  return order.map(index => columns[index].join('')).join('');
}

export function columnarDecrypt(encryptedText: string, key: string): string {
  const columns: string[][] = Array.from({ length: key.length }, () => []);
  const order = key
      .split('')
      .map((char, i) => ({ char, index: i }))
      .sort((a, b) => a.char.localeCompare(b.char))
      .map(obj => obj.index);

  // Calculate the number of full rows and extra characters
  const fullRows = Math.floor(encryptedText.length / key.length);
  const extraChars = encryptedText.length % key.length;

  let idx = 0;

  // Rebuild the columns by filling them in the correct order
  for (let i = 0; i < key.length; i++) {
      const columnLength = i < extraChars ? fullRows + 1 : fullRows;
      columns[order[i]] = encryptedText.slice(idx, idx + columnLength).split('');
      idx += columnLength;
  }

  // Rebuild the text by reading it row by row
  let decryptedText = '';
  for (let row = 0; row < fullRows + (extraChars > 0 ? 1 : 0); row++) {
      for (let col = 0; col < key.length; col++) {
          if (columns[col][row] !== undefined) {
              decryptedText += columns[col][row];
          }
      }
  }

  return decryptedText;
}

// Example usage
// const plaintext = "HELLO COLUMNAR";
// const key = "KEY";

// const encryptedMessage = columnarEncrypt(plaintext, key);
// console.log("Encrypted Message:", encryptedMessage); // Encrypted message

// const decryptedMessage = columnarDecrypt(encryptedMessage, key);
// console.log("Decrypted Message:", decryptedMessage); // Decrypted message

  
  // console.log(columnarEncrypt("HELLO", "KEY")); // Expected: "LOEHL"
  