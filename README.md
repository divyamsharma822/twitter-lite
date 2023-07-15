# Preview

  <img width="500px" src="https://github.com/divyamsharma822/twitter-lite/assets/54996898/74daa20b-a579-477b-9789-5d2274682ddf">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img width="200" height="400" src="https://github.com/divyamsharma822/twitter-lite/assets/54996898/ebe97cf5-a920-4610-8a70-4e925dc73082">
  
 # Setup Instructions
### 1. Install dependencies  
  For client
   ```
   cd ./client
   ```
   ```
   npm install
   ```
 For server
   ```
   cd ./server
   ```
   ```
   npm install
   ```

### 2. Configure the `config.env` file in config folder in client
 DO NOT CHANGE PORT
    
   ```
  PORT=4000
  DB_URI=
  JWT_SECRET=
  JWT_EXPIRE=5d
  COOKIE_EXPIRE=5
   ```
### 3. Run Server on `4000` port
  
  ```
   cd ./server
   ```
   ```
   npm run dev
   ```
### 4. Run Client on `3000` port
  
  ```
   cd ./client
   ```
   ```
   npm start --port 3000
   ```
