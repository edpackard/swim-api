import SwimRouter from "../routers/swimRouter";
import SwimController from "../controllers/SwimController";

import request from 'supertest'
import express from 'express'
import { createCipheriv } from "crypto";

jest.mock('../controllers/SwimController')
const mockedController = (SwimController as unknown) as jest.Mock<SwimController>;
let mockController: SwimController;
mockController = new mockedController

const swimRouter = new SwimRouter(mockController)

const app = express();
app.use('/', swimRouter.getRouter())

describe('get all swims', () => {
  test("happy route: responds to /", async() => {
    jest.spyOn(mockController, 'getAllSwims').mockReturnValue([])    
    const res = await request(app).get('/')
    expect(res.statusCode).toBe(200)
    expect(res.body).toStrictEqual([])
  })

  test("unhappy route: throws error", async() => {
   jest.spyOn(mockController, 'getAllSwims').mockImplementation(() => {
      throw Error('Fake Error Message');
    });
    const res = await request(app).get('/') 
    expect(res.statusCode).toBe(500)
    expect(res.body).toMatchObject({message: 'Fake Error Message'})
    })
})