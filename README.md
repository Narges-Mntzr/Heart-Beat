# ❤️ Heartbeat

**Heartbeat** is a lightweight social networking application designed to help users quickly and easily share their status with loved ones by sending heartbeat signals. Originally developed during the Iran–Israel conflict, the app aims to provide peace of mind by allowing users to confirm they are safe, stay connected, and communicate in real-time during critical situations.

Built with a modern full-stack approach, Heartbeat uses Django REST Framework on the backend and React Native with Expo on the frontend, offering a smooth, cross-platform mobile experience.

## Tech Stack

- **Backend:** Django + Django REST Framework + SQLite
- **Frontend:** Expo (React Native) + Axios + AsyncStorage
- **Styling:** NativeWind (Tailwind for React Native)

## Features

- Sign up / Log in with input validation
- Persistent login using local storage
- Home screen showing followers and following
- Follow users by username
- Live username suggestions while typing
- Proper error handling (duplicate, invalid, or non-existent usernames)
-  Send direct messages to followers; unread messages are visually indicated.


## Setup Instructions

### Backend

```bash
cd server
python -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
The backend runs a RESTful API accessible at http://localhost:8000 by default.

### Frontend

```bash
cd client
npm install
npx expo start
```
Run the app via Expo Go or an emulator on your mobile device.

## Contributors
- **Narges Montazeri:** Email: Narges.montazeri81@gmail.com , Github: [Narges-Mntzr](https://github.com/Narges-Mntzr).<br />
- **Zeinab Montazeri:**  Email: zeinab.montazeri@gmail.com , Github: [zeinabmontazeri](https://github.com/zeinabmontazeri).<br />
