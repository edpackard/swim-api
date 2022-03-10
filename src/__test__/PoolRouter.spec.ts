import PoolRouter from "../routers/PoolRouter"
import PoolController from "../controllers/PoolController"

import request from "supertest"
import express from 'express'

jest.mock('../controllers/PoolController')
const mockedController = (PoolController as unknown) as jest.Mock<PoolController>
let mockController: PoolController
mockController = new mockedController

const poolRouter = new PoolRouter(mockController)

const app = express();
app.use(express.json())
app.use('/', poolRouter.getRouter())

describe('get all pools', () => {
  test ('happy route: responds to /', async () => {
    await request(app).get('/');
    expect(mockController.getAllPools).toHaveBeenCalledTimes(1)
  })
})

describe('get pool by ID', () => {
  test ( 'happy route: responds to /1', async () => {
    await request(app).get('/1');
    expect(mockController.getPool).toHaveBeenCalledTimes(1)
    expect(mockController.getPool).toHaveBeenCalledWith(
      expect.objectContaining({ 
        params: { id: "1" },        
      }),
      expect.anything()
      );
  })
})

describe('create new pool', () => {
  test ('happy route: responds to / post', async () => {
    await request(app)
      .post('/')
      .send({ name: "Pool Name", length: 25})
    expect(mockController.createPool).toHaveBeenCalledTimes(1)
    expect(mockController.createPool).toHaveBeenCalledWith(
      expect.objectContaining({
        body: { name: "Pool Name", length: 25}
      }),
      expect.anything()
    );
  })
})

//TODO: unhappy routes for above
