import SwimRouter from "../routers/swimRouter";
import SwimController from "../controllers/SwimController";

import request from 'supertest'
import express from 'express'

jest.mock('../controllers/SwimController')
const mockedController = (SwimController as unknown) as jest.Mock<SwimController>;
let mockController: SwimController;
mockController = new mockedController

const swimRouter = new SwimRouter(mockController)

const app = express();
app.use('/', swimRouter.getRouter())

describe('good route', () => {
  test("responds to /", async() => {
    jest.spyOn(mockController, 'getAllSwims').mockReturnValue([])    
    const res = await request(app).get('/')
    expect(res.statusCode).toBe(200)
    expect(res.body).toStrictEqual([])
  })
})