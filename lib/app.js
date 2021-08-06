import express from 'express';
import toppingController from './controllers/toppings.js';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {res.send('Bubble Tea API');});
app.use('/api/v1/toppings', toppingController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
