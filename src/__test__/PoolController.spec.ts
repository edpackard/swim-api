import { Request, Response } from 'express'

import PoolController from '../controllers/PoolController'
import Database from '../data/Database'

let poolController: PoolController

jest.mock('../data/Database')
const mockedDatabase = (Database as unknown) as jest.Mock<Database>;
let mockDb: Database

let mockRequest: Request
let mockResponse: Response
let mockStatus: jest.Mock
let mockJson: jest.Mock

beforeEach(() => {
  mockDb = new mockedDatabase
  poolController = new PoolController(mockDb)
  mockStatus = jest.fn().mockReturnThis()
  mockJson = jest.fn().mockReturnThis() 
  mockRequest = {} as Partial<Request> as Request
  mockResponse = {
    json: mockJson,
    status: mockStatus,
  } as Partial<Response> as Response
})

afterEach(() => {
  jest.resetAllMocks();
})

describe('getAllPools', () => {

  it ('returns an empty array if no swims stored', () => {
  
    jest.spyOn(mockDb, 'getAllData').mockReturnValueOnce([])
    poolController.getAllPools(mockRequest, mockResponse)
    expect(mockDb.getAllData).toHaveBeenCalled()
    expect(mockStatus).toHaveBeenCalledWith(200)
    expect(mockJson).toHaveBeenCalledWith([])
  })
})

describe('createPool', () => {
  it ('create a valid new pool object with ID', () => {
    mockRequest = {
      body: { name: 'Local Pool', length: 25}
    } as Partial<Request> as Request
    const poolObject = { id: 1, length: 25, name: "Local Pool" }
    poolController.createPool(mockRequest, mockResponse)
    expect(mockDb.saveData).toHaveBeenCalledWith(poolObject)
    expect(mockStatus).toHaveBeenCalledWith(200)
  })
})