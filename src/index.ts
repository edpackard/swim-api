import express from 'express'
import SwimRouter from './routers/swimRouter'

const app = express();

const PORT = 8080;

const swimRouter = new SwimRouter

app.use(express.json())

app.use('/swim', swimRouter.getRouter());

app.get('/', (_, res) => res.send ('Welcome to the server'))

app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`)
});