
const express = require('express');
const axios = require('axios');
const router = express.Router();
const Weather = require('../Models/Weather');

const API_KEY = process.env.WEATHER_API_KEY;

router.post('/', async (req, res) => {
  const { city } = req.body;

  if (!city || typeof city !== 'string' || city.trim() === '') {
    return res.status(400).json({ error: 'City name is required and must be a string' });
  }

  const trimmedCity = city.trim();

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${trimmedCity}&appid=${API_KEY}&units=metric`
    );

    const data = response.data;

    const weatherData = {
      city: data.name.toLowerCase(),
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed
    };

    const weather = new Weather(weatherData);
    await weather.save();

    res.status(201).json(weather);
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({ error: `City '${trimmedCity}' not found` });
    }
    res.status(500).json({ error: 'Failed to fetch or save weather data' });
  }
});


router.get('/', async (req, res) => {
  try {
    const weather = await Weather.find().sort({ date: -1 });
    res.json(weather);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});


router.get('/:city', async (req, res) => {
  const city = req.params.city.toLowerCase();
  try {
    const weather = await Weather.findOne({ city });
    if (!weather) return res.status(404).json({ error: 'City not found in database' });

    res.json(weather);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving weather data' });
  }
});


router.delete('/:city', async (req, res) => {
  const city = req.params.city.toLowerCase();
  try {
    const result = await Weather.findOneAndDelete({ city });
    if (!result) return res.status(404).json({ error: 'City not found in database' });

    res.json({ message: `Weather data for '${city}' deleted` });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting weather data' });
  }
});

router.put('/:city', async (req, res) => {
  const city = req.params.city.toLowerCase();
  const { temperature, description, humidity, windSpeed } = req.body;

  if (!temperature && !description && !humidity && !windSpeed) {
    return res.status(400).json({ error: 'At least one field must be provided for update' });
  }

  try {
    const updatedWeather = await Weather.findOneAndUpdate(
      { city },
      { $set: { temperature, description, humidity, windSpeed, date: new Date() } },
      { new: true } // return the updated document
    );

    if (!updatedWeather) {
      return res.status(404).json({ error: 'City not found in database' });
    }

    res.json({
      message: `Weather data for '${city}' updated successfully`,
      updated: updatedWeather
    });
  } catch (error) {
    res.status(500).json({ error: 'Error updating weather data' });
  }
});

module.exports = router;
