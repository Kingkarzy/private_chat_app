/**
 * 
 * *****    Write message letters out diagonally over a
          number of rows then read off cipher row by row
 ** 
 ****/
export function railFenceEncrypt(text: string, rails: number): string {
  const fence: string[][] = Array.from({ length: rails }, () => []);
  let rail = 0;
  let direction = 1;

  for (const char of text) {
    fence[rail].push(char);
    rail += direction;
    if (rail === 0 || rail === rails - 1) direction *= -1;
  }

  return fence.flat().join('');
}

export function railFenceDecrypt(encryptedText: string, rails: number): string {
  if (rails <= 1) return encryptedText;

  const textLength = encryptedText.length;
  const fence: string[][] = Array.from({ length: rails }, () => []);

  let rail = 0;
  let direction = 1;
  const railPattern: number[] = [];

  // Step 1: Determine the pattern in which the characters were arranged during encryption
  for (let i = 0; i < textLength; i++) {
    railPattern.push(rail);
    rail += direction;
    if (rail === 0 || rail === rails - 1) direction *= -1;
  }

  // Step 2: Fill the fence with characters from encryptedText following the pattern
  let charIndex = 0;
  for (let r = 0; r < rails; r++) {
    for (let i = 0; i < textLength; i++) {
      if (railPattern[i] === r) {
        fence[r].push(encryptedText[charIndex++]);
      }
    }
  }

  // Step 3: Read the characters in the original order
  let result = '';
  rail = 0;
  direction = 1;

  for (let i = 0; i < textLength; i++) {
    result += fence[rail].shift(); // Extract characters in the correct order
    rail += direction;
    if (rail === 0 || rail === rails - 1) direction *= -1;
  }

  return result;
}

