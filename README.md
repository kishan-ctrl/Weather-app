#Weather App (Node.js + MongoDB)

A backend project that fetches real-time weather data from OpenWeatherMap API and stores it in MongoDB. Provides RESTful APIs to Create, Read, and Delete weather data.

##Tech Stack

- **Node.js** – Backend runtime
- **Express.js** – API server framework
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB ORM
- **Axios** – API client
- **dotenv** – Environment variable management
- **Postman** – API testing tool

## Project Structure

```
weather-app/
   config/
       db.js
   models/
       Weather.js
   routes/
       weather.js
.env
.gitignore
server.js
package.json
README.md
```


### ⚙️ Setup Instructions

### 1. Clone this repo:

```bash
   git clone https://github.com/kishan-ctrl/Weather-app.git
   cd weather-app 
```
### 2. Initialize the Node.js Project
```bash
   npm init -y
```

### 4.Install Required Dependencies
```bash
   npm install express mongoose axios dotenv
```
### 5.Install Dev Dependencies
```bash
   npm install nodemon --save-dev
```
### 6. start the server  

```bash
   node server.js
```





