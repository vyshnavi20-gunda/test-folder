const axios = require('axios');

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { city } = req.query;

    // Comprehensive input validation
    if (!city || city.trim() === '') {
      return res.status(400).json({ error: 'City name is required' });
    }

    // Check for valid city name format
    const trimmedCity = city.trim();

    // Reject if city name is too long (reasonable limit)
    if (trimmedCity.length > 100) {
      return res.status(400).json({ error: 'City name is too long (maximum 100 characters)' });
    }

    // Reject if city name contains only numbers
    if (/^\d+$/.test(trimmedCity)) {
      return res.status(400).json({ error: 'City name cannot contain only numbers' });
    }

    // Reject if city name contains potentially dangerous characters
    if (/[<>\"'&]/.test(trimmedCity)) {
      return res.status(400).json({ error: 'City name contains invalid characters' });
    }

    // Reject if city name looks like a URL or contains suspicious patterns
    if (trimmedCity.includes('://') || trimmedCity.includes('script') || trimmedCity.includes('javascript')) {
      return res.status(400).json({ error: 'Invalid city name format' });
    }

    // Using WeatherAPI.com (free tier - 1M calls/month)
    const apiKey = process.env.WEATHER_API_KEY || 'demo_key';
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;

    const response = await axios.get(url);
    const data = response.data;

    const weatherInfo = {
      city: data.location.name,
      country: data.location.country,
      temperature: data.current.temp_c,
      description: data.current.condition.text,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_kph / 3.6, // Convert km/h to m/s
      icon: data.current.condition.icon
    };

    res.status(200).json(weatherInfo);
  } catch (error) {
    console.error('Weather API error:', error.message);

    // Handle specific HTTP status codes
    if (error.response?.status) {
      const status = error.response.status;

      switch (status) {
        case 400:
          return res.status(400).json({ error: 'Invalid city name or location not found' });
        case 401:
          return res.status(401).json({ error: 'Invalid API key' });
        case 403:
          return res.status(403).json({ error: 'API key access forbidden' });
        case 404:
          return res.status(404).json({ error: 'City not found' });
        case 429:
          return res.status(429).json({ error: 'Too many requests. Please try again later' });
        case 500:
        case 502:
        case 503:
        case 504:
          return res.status(503).json({ error: 'Weather service temporarily unavailable' });
        default:
          return res.status(500).json({ error: 'Weather service error' });
      }
    }

    // Handle network errors or other issues
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      return res.status(503).json({ error: 'Unable to connect to weather service' });
    }

    if (error.code === 'ETIMEDOUT') {
      return res.status(408).json({ error: 'Request timed out. Please try again' });
    }

    // For demo purposes, return mock data if API fails (network issues, etc.)
    console.log('Falling back to mock data for city:', req.query.city);
    const mockWeather = {
      city: req.query.city,
      country: 'Demo',
      temperature: 25,
      description: 'Clear sky',
      humidity: 60,
      windSpeed: 3.5,
      icon: '01d'
    };

    res.status(200).json(mockWeather);
  }
}
