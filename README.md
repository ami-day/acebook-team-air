<h1 align="center">
 Acebook - Team Air
</h1>

<p align="center">
In this group project we were tasked with taking on an existing codebase for a social media app "Acebook" and extending and improving on both the frontend and backend of the app to include new features. A significant part of the work included familiairising ourselves with the codebase we inherited and learning and implementing new languages and frameworks within a timeframe of two weeks. We also focused heavily on styling to make the app more interactive and "user friendly".
</p>

## Our Team
* **[Ami Day](https://github.com/ami-day)**
* **[Khalifa Fadel](https://github.com/kmf0208)**
* **[Rickie Patrick](https://github.com/1sAndZeros)**
* **[Sarah Ellis](https://github.com/cloud-spotter)**
* **[Tom Wheelan](https://github.com/TWhela)

## Tech stack

**Frontend:**
<img src="https://img.shields.io/badge/Javascript-yellow?logo=javascript"> <img src="https://img.shields.io/badge/HTML-orange?logo=HTML"> <img src="https://img.shields.io/badge/CSS-blue?logo=CSS"> <img src="https://img.shields.io/badge/React-grey?logo=React">

**Backend:**
<img src="https://img.shields.io/badge/MongoDB-green?logo=MongoDB"> <img src="https://img.shields.io/badge/Express-black?logo=Express"> <img src="https://img.shields.io/badge/Node-darkgreen?logo=Node">

## Running the App

### Installing Node.js

1. Install Node Version Manager (NVM)
   ```
   brew install nvm
   ```
   Then follow the instructions to update your `~/.bash_profile`.
2. Open a new terminal
3. Install the latest version of [Node.js](https://nodejs.org/en/), currently `18.1.0`.
   ```
   nvm install 18
   ```

### Project set-up

1. Install Node.js dependencies for both the `frontend` and `api` directories.
   ```
   ; cd api
   ; npm install
   ; cd ../frontend
   ; npm install
   ```
2. Install MongoDB
   ```
   brew tap mongodb/brew
   brew install mongodb-community@5.0
   ```
3. Start MongoDB
   ```
   brew services start mongodb-community@5.0
   ```

### Running thr server

1. Start the server application (in the `api` directory)

  **Note the use of an environment variable for the JWT secret**

   ```
   ; cd api
   ; JWT_SECRET=f6d278bb34e1d0e146a80b16ec254c05 npm start
   ```
2. Start the front end application (in the `frontend` directory)

  In a new terminal session...

  ```
  ; cd frontend
  ; npm start
  ```

You should now be able to open your browser and go to `http://localhost:3000/signup` to create a new user.

### How to run automated tests

The automated tests run by sending actual HTTP requests to the API. Therefore, before anything, you'll need to start the backend server in test mode (so that it connects to the test DB).

**Note the use of an environment variable for the JWT secret**

```bash
# Make sure you're in the api directory
; cd api

; JWT_SECRET=f6d278bb34e1d0e146a80b16ec254c05 npm run start:test
```

You should leave this running in a terminal.

Then, you can either run tests for the backend or the frontend following the steps below. 

#### Running tests for the backend

Run the tests in a new terminal session:

```bash
# Make sure you're in the api directory
; cd api

; JWT_SECRET=f6d278bb34e1d0e146a80b16ec254c05 npm run test
```

####  Running tests for the frontend

Start the front end in a new terminal session

```bash
# Make sure you're in the frontend directory
; cd frontend

; JWT_SECRET=f6d278bb34e1d0e146a80b16ec254c05 npm start
```

Then run the tests in a new terminal session

```bash
# Make sure you're in the frontend directory
; cd frontend

; JWT_SECRET=f6d278bb34e1d0e146a80b16ec254c05 npm run test
```
