# Espira : a Smart Greenhouse Control App

Espira is an interactive mobile application designed to simplify and automate greenhouse management. It enables users to monitor, control, and optimize greenhouse conditions remotely in real time.

---

## Features

### Automatic Device Integration
Connected sensors and smart devices are automatically  added to the system after setup.

### Real-Time Monitoring
Track essential greenhouse data such as temperature, humidity, and soil moisture in real time.

### Remote Device Control
Control irrigation, lighting, and window systems directly from the app.

### Alerts & Notifications
Receive instant notifications when devices require attention 

### Data History & Analytics
Access historical data and visualize trends to improve plant health

---

## Setup & Configuration

### Prerequisites
- Node.js 21.x+
- Git
- MySQL database
- Expo CLI / EAS CLI installed

---

## Installation

Clone the repository:

```bash
git clone https://github.com/hiba-khadir/espira_app.git
cd espira_app
```

---

## Frontend Setup

Install dependencies:

```bash
cd frontend
npm install
```

Create environment file:

```bash
cp .env.development .env
```

Add variables:

```env
EXPO_PUBLIC_API_URL=SEE_NOTE_BELOW
```

Start the app:

```bash
npx expo start
```

Run on:
- Emulator, or
- Physical device (via development build)

---

## Backend Setup

Install dependencies:

```bash
cd backend
npm install
```

Create environment file:

```bash
cp .env .env
```

Add variables:

```env
DB_HOST=your_database_host
DB_USER=your_database_user
DB_NAME=your_database_name
DB_PASSWORD=your_database_password
DB_PORT=3306

DATABASE_URL="mysql://root:your_database_password@localhost:3306/your_database_name"

MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_SECURE=false
MAIL_USER=your_email@example.com
MAIL_PASS=your_email_password

FRONTEND_URL=SEE_NOTE_BELOW

JWT_SECRET=your_jwt_secret
```

Start backend:

```bash
npm run dev
```

---

## Environment Notes

### Android Emulator
```env
FRONTEND_URL=http://10.0.2.2:8081
EXPO_PUBLIC_API_URL=http://10.0.2.2:3000
```

### iOS Simulator
```env
FRONTEND_URL=http://localhost:8081
EXPO_PUBLIC_API_URL=http://localhost:3000
```

---

## Physical Device Setup

### Step 1: Build the App

```bash
# Android
eas build -p android --profile preview

# iOS
eas build -p ios --profile preview
```

### Step 2: Install Build
- Download the APK (Android) or IPA (iOS)
- Install it on your device
- Scan previous QR code with app 

### Step 3: Configure Environment

```env
FRONTEND_URL=http://YOUR_LOCAL_IP:8081
EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:3000
```
