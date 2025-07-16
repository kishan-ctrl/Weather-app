
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./Config/DB');
const weatherRoutes = require('./Routes/Weather');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use('/weather', weatherRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
