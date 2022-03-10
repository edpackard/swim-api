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
    expect(res.body).toStrictEqual({message: 'Fake Error Message'})
    })
})

describe('get swim by ID', () => {
  test("happy route: responds to /:id", async() => {
    const swimObject = { id: 1, lengths: 50, pool: "Local Pool", date: new Date ("1/1/11").toISOString() }
    jest.spyOn(mockController, 'getSwim').mockReturnValue(swimObject)
    const res = await request(app).get('/1')
    expect(res.statusCode).toBe(200)
    expect(res.body).toStrictEqual(swimObject)
  })
})

//TODO: happy and unhappy routes for: get by ID, post, put by id, delete by id