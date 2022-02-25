import SwimController from '../controllers/SwimController'
import SwimData from '../data/SwimData'

jest.mock('../data/swimData')
const mockedDatabase = (SwimData as unknown) as jest.Mock<SwimData>;
let mockDb: SwimData
let swimController: SwimController

beforeEach(() => {
  mockDb = new mockedDatabase
  swimController = new SwimController(mockDb)
})

describe('getAllSwims', () => {

  it('returns an empty array if no swims stored', () => {
    jest.spyOn(mockDb, 'getAllData').mockReturnValueOnce([])
    
    const result = swimController.getAllSwims()
    expect(mockDb.getAllData).toHaveBeenCalled()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  });

  it('returns array with swims if objects stored', () => {
    const mockSwim = { id: 1, lengths: 40, pool: 'Lido', date: new Date ("1/22/22") }
    jest.spyOn(mockDb, 'getAllData').mockReturnValueOnce([mockSwim])
    
    const result = swimController.getAllSwims()
    expect(mockDb.getAllData).toHaveBeenCalled()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([mockSwim])
  }) 
})

describe('getSwim', () => {

  it('returns a swim based on ID', () => {
    const mockSwim2 = { id: 2, lengths: 45, pool: 'Another Pool', date: new Date ("1/30/22") }
    jest.spyOn(mockDb, 'getData').mockReturnValueOnce(mockSwim2)

    const result = swimController.getSwim(2)
    expect(mockDb.getData).toHaveBeenCalled()
    expect(result).toBe(mockSwim2)
  })
})

describe('createSwim', () => {
  it('saves a new swim object with ID', () => {
    const date = new Date("1/1/22")
    const swimObject = { id: 1, lengths: 60, pool: "Local Pool", date: date }
    jest.spyOn(mockDb, 'getAllData').mockReturnValueOnce([])

    swimController.createSwim(60, "Local Pool", date)
    expect(mockDb.saveData).toHaveBeenCalledWith(swimObject)
  })

  it('generates sequential IDs', () => {
    const date = new Date("2/2/22")
    const swimObject = { id: 1, lengths: 70, pool: "Olympic Pool", date: date }
    const date2 = new Date("3/3/22")
    const swimObject2 = { id: 2, lengths: 40, pool: "Local Pool", date: date2 }

    jest.spyOn(mockDb, 'getAllData').mockReturnValueOnce([])
    swimController.createSwim(70, "Olympic Pool", date)
    expect(mockDb.saveData).toHaveBeenCalledWith(swimObject)

    jest.spyOn(mockDb, 'getAllData').mockReturnValueOnce([swimObject])
    swimController.createSwim(40, "Local Pool", date2)
    expect(mockDb.saveData).toHaveBeenCalledWith(swimObject2)
  })

  it('deletes a swim by id', () => {
    jest.spyOn(mockDb, 'deleteData')
    swimController.deleteSwim(1)
    expect(mockDb.deleteData).toHaveBeenCalledWith(1)
  })
})