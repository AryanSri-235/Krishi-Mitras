# 🌾 Krishi Mitras

Krishi Mitras is a smart agriculture assistance platform built using **React + Vite** that helps farmers access real-time agricultural information and resources from a single dashboard.

## 🚀 Features

### 🔐 Secure Authentication

* User registration and login using **Firebase Authentication**.
* Secure access to personalized farmer services.

### 📍 Farmer Location Tracking

* Detects and stores the farmer's current location using browser geolocation.
* Provides location-based agricultural information and recommendations.

### 💹 Real-Time Mandi Prices

* Displays the latest mandi (market) prices for various crops.
* Helps farmers make informed selling decisions based on current market trends.

### 🌦 Weather Updates

* Provides real-time weather information and forecasts.
* Helps farmers plan irrigation, harvesting, and other farming activities effectively.

### 🎥 Agricultural Tutorial Videos

* Curated educational videos on:

  * Modern farming techniques
  * Crop management
  * Irrigation methods
  * Government schemes
  * Sustainable agriculture practices

### 📱 Responsive Design

* Mobile-friendly and responsive user interface.
* Accessible on desktops, tablets, and smartphones.

---

## 🛠 Tech Stack

### Frontend

* React.js
* Vite
* HTML5
* CSS3
* JavaScript (ES6+)

### Backend Services

* Firebase Authentication
* Firebase Firestore / Realtime Database

### APIs

* Weather API
* Mandi Price API
* Geolocation API

---

## 📂 Project Structure

```bash
Krishi-Mitras/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── firebase/
│   └── assets/
│
├── public/
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/Krishi-Mitras.git
```

### Navigate to Project Directory

```bash
cd Krishi-Mitras
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

---

## 🔥 Firebase Setup

1. Create a Firebase Project.
2. Enable Authentication.
3. Create a Firestore Database.
4. Add your Firebase configuration inside:

```javascript
src/firebase/firebaseConfig.js
```

Example:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXXXXX",
  appId: "XXXXXXX"
};
```

---

## 🎯 Future Enhancements

* AI-based crop recommendation system
* Disease detection using image processing
* Government scheme notifications
* Multilingual support
* Chatbot for farmer assistance

---

A web-based agricultural platform aimed at empowering farmers with technology-driven solutions and real-time information.
