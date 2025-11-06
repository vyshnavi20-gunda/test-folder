[README.md](https://github.com/user-attachments/files/23383091/README.md)
# InfoHub - Your Everyday Utilities App

A simple full-stack web application that brings together three everyday utilities in one place: Weather Information, Currency Conversion, and Motivational Quotes.

## Features

### 🌤️ Weather Information
- Get current weather data for any city worldwide
- Displays temperature, humidity, wind speed, and weather description
- Works with or without API key (uses mock data as fallback)

### 💱 Currency Converter
- Convert Indian Rupees (INR) to US Dollars (USD) and Euros (EUR)
- Real-time exchange rates using free APIs
- Handles errors gracefully with fallback rates

### 💭 Motivational Quotes
- Random inspirational quotes to brighten your day
- Clean, card-based design
- Instant quote generation

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- Modern CSS with gradients and animations
- Responsive design for mobile and desktop

### Backend
- **Node.js** with Express
- **Axios** for API calls
- **CORS** enabled for cross-origin requests
- RESTful API endpoints

## Project Structure

```
infohub/
├── backend/
│   ├── server.js          # Express server with API endpoints
│   ├── package.json       # Backend dependencies
│   └── .env.example       # Environment variables template
└── frontend/
    ├── src/
    │   ├── App.tsx        # Main React component with all widgets
    │   ├── App.css        # Styles for the application
    │   └── main.ts        # React app entry point
    ├── index.html         # HTML template
    └── package.json       # Frontend dependencies
```

## API Endpoints

### Weather
```
GET /api/weather/:city
```
Returns weather information for the specified city.

### Currency Conversion
```
GET /api/currency/convert?amount={number}
```
Converts INR to USD and EUR.

### Quotes
```
GET /api/quotes/random
```
Returns a random motivational quote.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd infohub
   ```

2. **Start the backend:**
   ```bash
   cd backend
   npm install
   npm start
   ```
   The backend will run on http://localhost:5000

3. **Start the frontend (in a new terminal):**
   ```bash
   cd backend/frontend
   npm install
   npm run dev
   ```
   The frontend will run on http://localhost:5173

4. **Open your browser** and navigate to http://localhost:5173

## API Keys (Optional)

For real weather data, you can get a free API key from [OpenWeatherMap](https://openweathermap.org/api) and add it to the backend:

```bash
# In backend/.env (create this file)
OPENWEATHER_API_KEY=your_api_key_here
```

Without the API key, the app will use mock weather data for demonstration.

## Features Overview

- **Single Page Application**: No page reloads when switching between utilities
- **Tabbed Navigation**: Clean, intuitive interface with icons
- **Loading States**: Visual feedback during API calls
- **Error Handling**: Graceful error messages for failed requests
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Beautiful gradients, animations, and card-based layouts

## Built for Learning

This project demonstrates:
- Full-stack development with React and Node.js
- API integration and error handling
- State management in React
- Responsive CSS design
- RESTful API design
- Modern JavaScript/TypeScript practices

## Future Enhancements

- Add more currencies to the converter
- Include weather forecasts
- Add user preferences and settings
- Implement caching for better performance
- Add unit tests

---

**Made with ❤️ by ByteXL**
