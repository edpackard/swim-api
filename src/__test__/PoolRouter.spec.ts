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
app.use('/', poolRouter.getRouter())

describe('get all pools: good route', () => {
  test ('responds to /', async () => {
    await request(app).get('/');
    expect(mockController.getAllPools).toHaveBeenCalledTimes(1)
  })
})