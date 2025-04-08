# 🔐 Encryption and Decryption Algorithms Using JavaScript Frameworks

A comprehensive JavaScript-based project demonstrating the implementation of both classical and modern encryption/decryption algorithms with an interactive user interface built using React.

## 📌 Project Overview

This project covers multiple encryption and decryption techniques, allowing users to explore how different cryptographic methods transform plaintext into ciphertext and vice versa. It’s designed for educational purposes, demonstrations, and beginner cryptography enthusiasts.

## ✨ Features

- 🔐 RSA Encryption/Decryption
- 🔐 Caesar Cipher
- 🔐 Columnar Cipher
- 🔐 Diffie-Hellman Key Exchange
- 🔐 Monoalphabetic Cipher
- 🔐 One-Time Pad (OTP)
- 🔐 Playfair Cipher
- 🔐 Polyalphabetic Cipher
- 🔐 Rail Fence Cipher
- 🧪 Input validation with real-time Toast error handling
- 💾 LocalStorage for storing keys and credentials
- 🧑‍💻 User-friendly React interface

---

## ⚙️ Technologies Used

- **JavaScript**
- **React.js**
- **React Toastify** (for user notifications)
- **CSS (Tailwind CSS)**

---

## 🧠 How It Works

Each algorithm is implemented in modular functions. Users can:
- Enter plaintext or ciphertext
- Specify keys (if required)
- Encrypt or decrypt using selected algorithms
- Get immediate results and feedback

RSA, for instance, includes key generation using small prime numbers and performs encryption using modular exponentiation.

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/encryption-algorithms.git
cd encryption-algorithms
npm install
npm run dev

/algorithms
  /rsa
  /caesar
  /playfair
  ...
/components
/pages
/utils
