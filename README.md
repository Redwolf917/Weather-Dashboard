# Weather Dashboard

## Description
The Weather Dashboard is a web application that allows users to view the current and future weather conditions for cities worldwide. Users can search for a city, view its weather data, and revisit previously searched cities via a search history.

## Features
- **Current Weather Conditions**:
  - City name
  - Date
  - Weather icon and description
  - Temperature
  - Wind speed
  - Humidity
- **5-Day Forecast**:
  - Date
  - Weather icon and description
  - Temperature
  - Wind speed
  - Humidity
- **Search History**:
  - Easily revisit previously searched cities.
  - Remove cities from the history.

## Technologies Used
- **Frontend**:
  - HTML
  - CSS (with Vite integration)
  - TypeScript
- **Backend**:
  - Node.js
  - Express.js
  - TypeScript
- **API**:
  - [OpenWeather API](https://openweathermap.org/forecast5)
- **Database**:
  - JSON file (`searchHistory.json`) for local storage of search history.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/weather-dashboard.git
   ```
2. Navigate to the project directory:
   ```bash
   cd weather-dashboard
   ```
3. Install dependencies for both client and server:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```
4. Add an `.env` file in the `server` directory with the following content:
   ```plaintext
   API_BASE_URL=https://api.openweathermap.org
   OPENWEATHER_API_KEY=your_openweather_api_key
   ```

## Usage
1. Build the client:
   ```bash
   cd client
   npm run build
   ```
2. Start the server:
   ```bash
   cd ../server
   npm start
   ```
3. Open your browser and navigate to `http://localhost:3001`.

## Deployment
The application is deployed on Render:
- **Backend**: [Your Render Backend URL](https://your-backend-url)
- **Frontend**: Served from the backend.

## API Endpoints
- `POST /api/weather/`:
  - Body: `{ "city": "City Name" }`
  - Response: Current weather and 5-day forecast data.
- `GET /api/weather/history`:
  - Retrieves the search history.
- `DELETE /api/weather/history/:id`:
  - Removes a city from the search history.

## License
This project is licensed under the MIT License.

---

## Acknowledgments
- [OpenWeather API](https://openweathermap.org/)
- Render Deployment Platform

