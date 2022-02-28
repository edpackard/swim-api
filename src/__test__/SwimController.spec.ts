import SwimController from '../controllers/SwimController'
import Database from '../data/Database'
import ValidityChecker from '../utils/ValidityChecker'

jest.mock('../data/Database')
const mockedDatabase = (Database as unknown) as jest.Mock<Database>;

jest.mock('../utils/ValidityChecker')
const mockedValidityChecker = (ValidityChecker as unknown) as jest.Mock<ValidityChecker>;

let mockDb: Database
let mockVc: ValidityChecker
let swimController: SwimController

beforeEach(() => {
  mockDb = new mockedDatabase
  mockVc = new mockedValidityChecker
  swimController = new SwimController(mockDb, mockVc)
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

  //TODO: returns error if swim if ID does not exist

})

describe('createSwim', () => {
  it('saves a valid new swim object with ID', () => {
    const date = new Date("1/1/22")
    const swimObject = { id: 1, lengths: 60, pool: "Local Pool", date: date }
    jest.spyOn(mockDb, 'getAllData').mockReturnValueOnce([])
    jest.spyOn(mockVc, 'isSwimValid').mockReturnValueOnce(true)
    swimController.createSwim(60, "Local Pool", date)
    expect(mockVc.isSwimValid).toHaveBeenCalledWith(swimObject)
    expect(mockDb.saveData).toHaveBeenCalledWith(swimObject)
  })

  it('does not save an invalid swim object with invalid date format', () => {
    const badObject = { id: 1, lengths: "60", pool: 55, date: false }
    jest.spyOn(mockDb, 'getAllData').mockReturnValueOnce([])
    jest.spyOn(mockVc, 'isSwimValid').mockReturnValueOnce(false)
    //@ts-expect-error
    expect(()=>{ swimController.createSwim("60", 55, false) }).toThrowError('Error: not a swim object')
    expect(mockVc.isSwimValid).toHaveBeenCalledWith(badObject)
    expect(mockDb.saveData).not.toHaveBeenCalled()
  })

  it('generates sequential IDs', () => {
    const date = new Date("2/2/22")
    const swimObject = { id: 1, lengths: 70, pool: "Olympic Pool", date: date }
    const date2 = new Date("3/3/22")
    const swimObject2 = { id: 2, lengths: 40, pool: "Local Pool", date: date2 }

    jest.spyOn(mockVc, 'isSwimValid').mockReturnValue(true)

    jest.spyOn(mockDb, 'getAllData').mockReturnValueOnce([])
    swimController.createSwim(70, "Olympic Pool", date)
    expect(mockDb.saveData).toHaveBeenCalledWith(swimObject)

    jest.spyOn(mockDb, 'getAllData').mockReturnValueOnce([swimObject])
    swimController.createSwim(40, "Local Pool", date2)
    expect(mockDb.saveData).toHaveBeenCalledWith(swimObject2)
  })
})

describe('deleteSwim', () => { 
  it('deletes a swim by id', () => {
    jest.spyOn(mockDb, 'deleteData')
    swimController.deleteSwim(1)
    expect(mockDb.deleteData).toHaveBeenCalledWith(1)
  })

  //TODO: does not delete if id not found

})

describe('updateSwim', () => {
  it('updates a swim by id', () => {
    const swimObject = { id: 1, lengths: 50, pool: "Local Pool", date: new Date ("1/1/11") }

    jest.spyOn(mockDb, 'updateData')
    swimController.updateSwim(1, 50, "Local Pool", new Date ("1/1/11"))
    expect(mockDb.updateData).toHaveBeenCalledWith(swimObject)
  })

  //TODO: does not update if id not found

  //TODO: does not update if data not a valid swim object
})
