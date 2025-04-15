# M2C Firebase Authentication System

This project implements a complete authentication system using Firebase Authentication, including:
- User registration with email and password
- User login
- Password reset functionality
- Protected dashboard page

## Setup

1. The project is already configured with your Firebase credentials.
2. Make sure you have the Firebase Authentication service enabled in your Firebase console.

## Running the Application

You can run this application using a local server. Here are a few options:

### Using Node.js and http-server:

If you have Node.js installed:
```
npx http-server
```

### Using Python:

If you have Python installed:
```
# Python 3
python -m http.server

# Python 2
python -m SimpleHTTPServer
```

## Features

- **User Registration**: Create a new account with name, email, and password
- **User Login**: Authenticate with email and password
- **Password Reset**: Request a password reset email
- **Protected Routes**: Dashboard page is only accessible to authenticated users
- **Responsive Design**: Works on mobile and desktop devices

## Project Structure

- `index.html` - Main authentication page with login and registration forms
- `dashboard.html` - Protected dashboard page for authenticated users
- `styles.css` - Styling for the application
- `firebase-config.js` - Firebase configuration and initialization
- `auth.js` - Authentication functionality (register, login, logout, reset password)
- `app.js` - UI interactions and form submissions

## Security

- Password validation ensures strong passwords
- Error handling for all authentication operations
- Protected routes redirect unauthenticated users to login page
