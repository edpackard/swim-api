import express from 'express'
import swimRouter from './routers/swimRouter'

const app = express();

const PORT = 8080;

app.get('/', (_, res) => res.send ('Welcome to the server'))
app.use('/swim', swimRouter);

app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`)
});