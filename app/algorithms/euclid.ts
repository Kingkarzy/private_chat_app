export function euclid(b: number, m: number): number {
    let Q;

    let A1 = 1;
    let A2 = 0;
    let A3 = m;

    let B1 = 0;
    let B2 = 1;
    let B3 = b;

    // Perform the Euclidean Algorithm
    while (B3 !== 0) {
        Q = Math.floor(A3 / B3);

        const T1 = A1 - Q * B1;
        const T2 = A2 - Q * B2;
        const T3 = A3 - Q * B3;

        [A1, A2, A3] = [B1, B2, B3];
        [B1, B2, B3] = [T1, T2, T3];
    }

    // If gcd is not 1, then no modular inverse exists
    if (A3 !== 1) {
        alert("No inverse exists");
        return -1; // or any default value indicating an error
    }

    // If gcd is 1, the modular inverse is B2
    return (A2 + m) % m; // Ensure the result is positive
}
