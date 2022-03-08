import { Request, Response } from 'express'

import PoolController from '../controllers/PoolController'
import Database from '../data/Database'

jest.mock('../data/Database')
const mockedDatabase = (Database as unknown) as jest.Mock<Database>;
let mockDb: Database

let poolController: PoolController

beforeEach(() => {
  mockDb = new mockedDatabase
  poolController = new PoolController(mockDb)
})

let mockRequest: Request
let mockResponse: Response
let mockStatus: jest.Mock // clarify typing here and next line
let mockJson: jest.Mock

describe('getAllPools', () => {

  beforeEach(() => {
    mockStatus = jest.fn().mockReturnThis() // what does this do?
    mockJson = jest.fn().mockReturnThis() // what does this do? 
    mockRequest = {} as Partial<Request> as Request
    mockResponse = {
      json: mockJson,
      status: mockStatus,
    } as Partial<Response> as Response
  })

  afterEach(() => {
    jest.resetAllMocks();
  })

  it ('returns an empty array if no swims stored', () => {
  
    jest.spyOn(mockDb, 'getAllData').mockReturnValueOnce([])
    poolController.getAllPools(mockRequest, mockResponse)
    expect(mockDb.getAllData).toHaveBeenCalled()
    expect(mockStatus).toHaveBeenCalledWith(200)
    expect(mockJson).toHaveBeenCalledWith([])
  })
})