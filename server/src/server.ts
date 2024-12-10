import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js';

dotenv.config();

console.log('Loaded API Key:', process.env.OPENWEATHER_API_KEY); // Debug log
console.log('Loaded API Base URL:', process.env.API_BASE_URL);  // Debug log


const app = express();
const PORT = process.env.PORT || 3001;

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.resolve(__dirname, '../../client/dist')));

// Connect routes
app.use(routes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
