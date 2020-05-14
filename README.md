# KEIRON TEST REACT+NODE+EXPRESS+MYSQL

# BASIC STEPS

## 1) Clone the Project

---

# SETUP DATABASE

## 1) Import the sql script keiron-db.sql into your mysql database

# SETUP BACKEND

## 1) Go to backend folder

## 2) Install dependencies

```bash
npm install
```

### 3) Make in the root the .env file and paste this code with your own config:

```js
APP_NAME=BACKEND-KEIRON-TEST;
APP_PORT=YOUR_PORT;
DB_HOST=YOUR_DB_HOST;
DB_NAME=YOUR_DATABASE;
DB_USERNAME=YOUR_DB_USERNAME;
DB_PASSWORD=YOUR_DB_PASSWORD;
SECRET_TOKEN=YOUR_SECRET_KEY;
DEFAULT_TYPE_USER=2;
NODE_ENV=development;
```

### For example:

APP_NAME=BACKEND-KEIRON-TEST
APP_PORT=5000
DB_NAME=keiron-db
DB_USERNAME=root
DB_PASSWORD=miclave123
DB_HOST=localhost
DEFAULT_TYPE_USER=2
SECRET_TOKEN=miclavesecreta


# SETUP FRONTEND

## 1) Go to frontend folder

## 2) Install dependencies

```bash
npm install
```

### 3) Make in the root the .env file and paste this code with your own config:

```js
REACT_APP_API_URL = YOUR_API_NODE_URL;
```

### For example:

```js
REACT_APP_API_URL=http://localhost:8105/api/v1
```

---

# RUN PROJECT:

## 1) Go to root folder (You must see backend and frontend folders)

## 2) Run and wait a seconds for building and React open a navigator tab with the frontend

```bash
npm start
```

### 3) Admin Credentials:

```text
email: admin@example.com
pass: 123456
```

### 4) Enjoy!
