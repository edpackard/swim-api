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
app.use(express.json())
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

describe('post swim', () => {
  test("happy route: successfully posts", async() => {
    const testDate = new Date ("1/2/13").toISOString()
    const res = await request(app)
      .post('/')
      .send({ lengths: 50, pool: "Pool", date: testDate })
    expect(res.statusCode).toBe(201)
    expect(mockController.createSwim).toHaveBeenCalledTimes(1)
    expect(mockController.createSwim).toHaveBeenCalledWith(50, "Pool", testDate)
  })
})

describe('update swim', () => {
  test("happy route: successfully updates", async() => {
    const testDate = new Date ("2/3/14").toISOString()
    const res = await request(app)
      .put('/1')
      .send({ lengths: 40, pool: "Updated Pool", date: testDate})
    expect(res.statusCode).toBe(204)
    expect(mockController.updateSwim).toHaveBeenCalledTimes(1)
    expect(mockController.updateSwim).toHaveBeenCalledWith(1, 40, 'Updated Pool', testDate)
  })
})

describe('delete swim', () => {
  test("happy route: successfully deletes", async() => {
    const res = await request(app).delete('/4')
    expect(res.statusCode).toBe(204)
    expect(mockController.deleteSwim).toHaveBeenCalledTimes(1)
    expect(mockController.deleteSwim).toHaveBeenCalledWith(4)
  })
})

//TODO: tests for unhappy routes for: get by ID, post, put by id, delete by id
