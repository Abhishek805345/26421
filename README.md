# Notification System

This project has a simple backend script and a simple React frontend for showing notifications.

The app fetches notifications from the evaluation API, sorts priority notifications, filters by notification type, and sends logs using the required log API.

## Project Setup

Install backend dependencies:

```bash
cd notification_app_be
npm install
```

Install frontend dependencies:

```bash
cd notification_app_fe
npm install
```

## How To Run

Run the React frontend:

```bash
cd notification_app_fe
npm run dev
```

Open:

```txt
http://localhost:3000
```

Run the backend notification script:

```bash
cd notification_app_be
node index.js
```

Or:

```bash
npm start
```

## Folder Structure

```txt
.
├── logging_middleware/
├── notification_app_be/
│   ├── index.js          # backend main file
│   ├── fetch.js          # backend API fetch file
│   ├── log.js            # backend logging function
│   ├── utils.js          # backend sorting function
│   ├── config.js         # backend API/auth details
│   └── package.json
├── notification_app_fe/
│   ├── src/
│   │   ├── api/          # frontend API and logging files
│   │   ├── components/   # small reusable UI components
│   │   ├── hooks/        # custom hook for notifications
│   │   ├── pages/        # app pages
│   │   └── utils/        # frontend sorting function
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── README.md
└── notification_system_design.md
```

## Features

- Shows all notifications
- Shows priority notifications using Top N
- Filters notifications by Event, Result, and Placement
- Shows unread/read UI
- Marks notifications as read
- Uses basic React with `useState` and `useEffect`
- Sends logs on API call, page load, filter change, and errors

## Approach

The backend and frontend both fetch notifications from:

```txt
http://20.207.122.201/evaluation-service/notifications
```

For logging, the project uses:

```txt
http://20.207.122.201/evaluation-service/logs
```

The app first gets an access token from the auth API. After that, the same token is used for notification API calls and log API calls.

Sorting is done with simple priority values:

```txt
Placement = highest
Result = second
Event = third
```

If two notifications have the same type, the latest timestamp comes first.

## Error Handling

The app shows basic error messages if:

- token API fails
- notifications API fails
- log API fails
- response data is not in the expected format

The error handling is kept simple so the code is still easy to understand.
