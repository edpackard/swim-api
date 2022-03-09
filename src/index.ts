import express from 'express'
import SwimRouter from './routers/swimRouter'
import PoolRouter from './routers/PoolRouter';

const app = express();

const PORT = 8080;

const swimRouter = new SwimRouter
const poolRouter = new PoolRouter

app.use(express.json())

app.use('/swim', swimRouter.getRouter());
app.use('/pool', poolRouter.getRouter());

app.get('/', (_, res) => res.send ('Welcome to the server'))

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
});