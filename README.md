# ❤️ Heartbeat

**Heartbeat** is a minimal social networking app built with Django REST Framework (backend) and Expo + React Native (frontend).  
It was originally created during the Iran–Israel war to help people quickly let their loved ones know they are safe and alive by sending a heartbeat signal. The app enables users to check in, follow others, and stay connected—especially during times of crisis.


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

### Frontend

```bash
cd client
npm install
npx expo start
```


## Contributors
- **Zeinab Montazeri:**  Email: 	zeinab.montazeri@gmail.com , Github: [zeinabmontazeri](https://github.com/zeinabmontazeri).<br />
- **Narges Montazeri:** Email: Narges.montazeri81@gmail.com , Github: [Narges-Mntzr](https://github.com/Narges-Mntzr).<br />
