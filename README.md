# World bites recipes from all over the world!
---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Setup](#setup)

---

### Tech Stack

- **Vite**
- **Firebase**
  - **Firebase Auth**
  - **Firebase Firestore**
- **Supabase**
- **Paddle**

---

## Setup

- **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/world-bites.git
   ```
- install dependencies
  ```bash
  npm install
  ```
- setup env variables in .env
example:
```html
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
VITE_FIREBASE_APP_ID=your-firebase-app-id
VITE_FIREBASE_MEASUREMENT_ID= your-firebase-measurement-idi
VITE_SUPABASE_KEY=your-supabase-key
```
in supabaseClient.js, change supabaseUrl = your-url

- in payment.jsx
setup paddle from https://sandbox-login.paddle.com/login (account for development not real payment)<br/>
change token and priceId according to your paddle and finally in paddle checkout, checkout settings <br/>
add 'Default payment link' to your webapp (e.g. localhost)



