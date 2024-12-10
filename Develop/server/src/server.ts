import dotenv from 'dotenv';
import express from 'express';
import routes from './routes/index.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.resolve(__dirname, '../../client/dist')));

// Connect routes
app.use(routes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
