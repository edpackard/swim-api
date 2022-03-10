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
    const mockSwim = { id: 1, lengths: 40, pool: 'Lido', date: new Date ("1/22/22").toISOString() }
    jest.spyOn(mockDb, 'getAllData').mockReturnValueOnce([mockSwim])
    
    const result = swimController.getAllSwims()
    expect(mockDb.getAllData).toHaveBeenCalled()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([mockSwim])
  }) 
})

describe('getSwim', () => {

  it('returns a swim based on ID', () => {
    const mockSwim2 = { id: 2, lengths: 45, pool: 'Another Pool', date: new Date ("1/30/22").toISOString() }
    jest.spyOn(mockDb, 'getData').mockReturnValueOnce(mockSwim2)

    const result = swimController.getSwim(2)
    expect(mockDb.getData).toHaveBeenCalled()
    expect(result).toBe(mockSwim2)
  })

})

describe('createSwim', () => {
  it('saves a valid new swim object with ID', () => {
    const date = new Date("1/1/22").toISOString()
    const swimObject = { id: 1, lengths: 60, pool: "Local Pool", date: date }
    jest.spyOn(mockDb, 'getAllData').mockReturnValueOnce([])
    jest.spyOn(mockVc, 'isSwimValid').mockReturnValueOnce(true)
    swimController.createSwim(60, "Local Pool", date)
    expect(mockVc.isSwimValid).toHaveBeenCalledWith(swimObject)
    expect(mockDb.saveData).toHaveBeenCalledWith(swimObject)
  })

  it('does not save an invalid swim object', () => {
    const badObject = { id: 1, lengths: "60", pool: 55, date: false }
    jest.spyOn(mockDb, 'getAllData').mockReturnValueOnce([])
    jest.spyOn(mockVc, 'isSwimValid').mockReturnValueOnce(false)
    //@ts-expect-error
    expect(()=>{ swimController.createSwim("60", 55, false) }).toThrow('Error: not a swim object')
    //@ts-expect-error
    expect(()=>{ swimController.createSwim("60", 55, false) }).toThrowError(Error)
    expect(mockVc.isSwimValid).toHaveBeenCalledWith(badObject)
    expect(mockDb.saveData).not.toHaveBeenCalled()
  })

  it('generates sequential IDs', () => {
    const date = new Date("2/2/22").toISOString()
    const swimObject = { id: 1, lengths: 70, pool: "Olympic Pool", date: date }
    const date2 = new Date("3/3/22").toISOString()
    const swimObject2 = { id: 2, lengths: 40, pool: "Local Pool", date: date2 }

    jest.spyOn(mockVc, 'isSwimValid').mockReturnValue(true)

    jest.spyOn(mockDb, 'getLatestItem').mockReturnValueOnce(undefined)
    swimController.createSwim(70, "Olympic Pool", date)
    expect(mockDb.saveData).toHaveBeenCalledWith(swimObject)

    jest.spyOn(mockDb, 'getLatestItem').mockReturnValueOnce(swimObject)
    swimController.createSwim(40, "Local Pool", date2)
    expect(mockDb.saveData).toHaveBeenCalledWith(swimObject2)
  })

  it('handles situations where existing data has been deleted when generating IDs', () => {
    const date = new Date("2/2/22").toISOString()
    const swimObject = { id: 45, lengths: 70, pool: "Olympic Pool", date: date }
    const date2 = new Date("3/3/22").toISOString()
    const swimObject2 = { id: 46, lengths: 40, pool: "Local Pool", date: date2 }

    jest.spyOn(mockVc, 'isSwimValid').mockReturnValue(true)
    jest.spyOn(mockDb, 'getLatestItem').mockReturnValueOnce(swimObject)

    swimController.createSwim(40, "Local Pool", date2)
    expect(mockDb.saveData).toHaveBeenCalledWith(swimObject2)
  })
})

describe('deleteSwim', () => { 
  it('deletes a swim by id', () => {
    swimController.deleteSwim(1)
    expect(mockDb.deleteData).toHaveBeenCalledWith(1)
  })
})

describe('updateSwim', () => {
  it('updates a swim by id', () => {
    const swimObject = { id: 1, lengths: 50, pool: "Local Pool", date: new Date ("1/1/11").toISOString() }
    jest.spyOn(mockVc, 'isSwimValid').mockReturnValueOnce(true)

    swimController.updateSwim(1, 50, "Local Pool", new Date ("1/1/11").toISOString())
    expect(mockDb.updateData).toHaveBeenCalledWith(swimObject)
  })

  it('does not update if params would create invalid swim object', () => {
    const badObject = { id: 10, lengths: "70", pool: false, date: 22222 }
    jest.spyOn(mockVc, 'isSwimValid').mockReturnValueOnce(false)
    //@ts-expect-error
    expect(()=>{ swimController.updateSwim(10, "70", false, 22222) }).toThrow('Error: cannot update with invalid parameters')
    //@ts-expect-error
    expect(()=>{ swimController.updateSwim(10, "70", false, 22222) }).toThrowError(Error)
    expect(mockVc.isSwimValid).toHaveBeenCalledWith(badObject)
    expect(mockDb.updateData).not.toHaveBeenCalled()
  })

})

