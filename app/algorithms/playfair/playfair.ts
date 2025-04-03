/* 
    Simplified implementation of Playfair cipher.

    a 5X5 matrix of letters based on a keyword
  • Fill in letters of keyword (sans duplicates)
  • Fill rest of matrix with other letters

*/
export function generatePlayfairKey(key: string): string[][] {
    const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; // 'J' is omitted
    key = key.toUpperCase().replace(/J/g, 'I');
    const matrixString = Array.from(new Set(key + alphabet)).join('');
    const grid: string[][] = [];
    for (let i = 0; i < 5; i++) {
      grid.push(matrixString.slice(i * 5, i * 5 + 5).split(''));
    }
    return grid;
  }
  
  export function playfairEncrypt(text: string, key: string): string {
    const grid = generatePlayfairKey(key);
    text = text.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
    let ciphertext = '';
  
    for (let i = 0; i < text.length; i += 2) {
      if (i + 1 === text.length || text[i] === text[i + 1]) {
        text = text.slice(0, i + 1) + 'X' + text.slice(i + 1);    // 1. If a pair is a repeated letter, insert filler like 'X’
      }
      const [row1, col1, row2, col2] = getPlayfairPosition(grid, text[i], text[i + 1]);
  
      if (row1 === row2) {
        ciphertext += grid[row1][(col1 + 1) % 5] + grid[row2][(col2 + 1) % 5]; //2. If both letters fall in the same row, replace each letter with the letter right to it
      } else if (col1 === col2) {
        ciphertext += grid[(row1 + 1) % 5][col1] + grid[(row2 + 1) % 5][col2]; //3. If both letters fall in the same column, replace each with the letter below it
      } else {
        ciphertext += grid[row1][col2] + grid[row2][col1]; //4. Otherwise each letter is replaced by the letter in the same row and in the column of the other letter of the pair
      }
    }
    return ciphertext;
  }
  
  export function playfairDecrypt(ciphertext: string, key: string): string {
    const grid = generatePlayfairKey(key);
    let plaintext = '';
  
    for (let i = 0; i < ciphertext.length; i += 2) {
      const [row1, col1, row2, col2] = getPlayfairPosition(grid, ciphertext[i], ciphertext[i + 1]);
  
      if (row1 === row2) {
        plaintext += grid[row1][(col1 + 4) % 5] + grid[row2][(col2 + 4) % 5];
      } else if (col1 === col2) {
        plaintext += grid[(row1 + 4) % 5][col1] + grid[(row2 + 4) % 5][col2];
      } else {
        plaintext += grid[row1][col2] + grid[row2][col1];
      }
    }
    return plaintext.replace(/X/g, ''); // Optional remove padding character
  }
  
  function getPlayfairPosition(grid: string[][], char1: string, char2: string): [number, number, number, number] {
    let row1 = -1,
      col1 = -1,
      row2 = -1,
      col2 = -1;
  
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (grid[row][col] === char1) [row1, col1] = [row, col];
        if (grid[row][col] === char2) [row2, col2] = [row, col];
      }
    }
    return [row1, col1, row2, col2];
  }
  
