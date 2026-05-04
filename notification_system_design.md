# Notification System Design

## Basic Idea

The notification system fetches notifications from an API and displays them in a simple frontend. It also has a backend script that can fetch, sort, and print the top notifications in the console.

The frontend has three main views:

- All notifications
- Priority notifications
- Filter notifications

## Approach To Sorting Notifications

The sorting is based on two things:

1. Notification type priority
2. Timestamp

First, the system checks the type of notification. After that, if two notifications have the same type, it compares their timestamps.

The latest notification is shown first when the type is same.

Example:

```txt
Placement on 10 AM
Placement on 9 AM
Result on 11 AM
Event on 12 PM
```

The Placement notifications still come first because Placement has higher priority than Result and Event.

## How Priority Works

Priority order is:

```txt
Placement > Result > Event
```

In code, simple numbers are used:

```txt
Placement = 3
Result = 2
Event = 1
```

So while sorting, higher number means higher priority.

If priority is same, timestamp is checked:

```txt
newer timestamp comes first
```

This keeps the logic simple and easy to understand.

## Handling New Incoming Notifications Efficiently

For this project, notifications are fetched from the API when the page loads.

If new notifications come from the API later, the same sorting function can be used again. The system does not need a new sorting method. It can simply:

1. Add the new notification to the list
2. Run the sorting function again
3. Display the updated top notifications

For a small student project, this is enough and easy to maintain.

If the project becomes bigger later, we can improve it by fetching notifications again after some time, like every 30 seconds. But right now, the app keeps things simple and loads data once when the page opens.

## Logging

The app uses the `Log()` function in important places:

- when page opens
- before API calls
- after API calls
- when filter changes
- when error happens

This helps in tracking what the app is doing without adding too much complicated code.

## Why This Design Is Simple

This design uses basic React concepts:

- `useState`
- `useEffect`
- simple components
- simple API functions

There is no Redux or advanced state management because the project does not need it.

The code is kept beginner-friendly but still organized enough for submission.
