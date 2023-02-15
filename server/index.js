import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import connect from './mongodb/connect.js';
import propertyRoutes from './routes/property.routes.js';
import userRoutes from './routes/user.routes.js';

// Load environment variables
dotenv.config();

// Create the express server instance
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(cors());

// Routes
app.get('/', (req, res) => {
	res.send({ message: 'Hello World' });
});

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/properties', propertyRoutes);

// Once connected to the database, start listening to the server
const PORT = process.env.PORT ?? 8080;
connect(() => app.listen(PORT, () => console.log(`Server up and running at http://localhost:${PORT}`)));
