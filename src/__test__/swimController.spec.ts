import swimController from '../controllers/swimController'
import * as database from '../data/swimData'

jest.mock('../data/swimData')
const mockedDatabase = database as jest.Mocked<typeof database>

describe('getAllSwims', () => {

  it('returns an empty array if no swims stored', () => {
    mockedDatabase.getAllData.mockReturnValueOnce([])
    
    const result = swimController.getAllSwims()
    expect(mockedDatabase.getAllData).toHaveBeenCalled()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  });

  it('returns array with swims if objects stored', () => {
    const mockSwim = { id: 1, lengths: 40, pool: 'Lido', date: new Date ("1/22/22") }
    mockedDatabase.getAllData.mockReturnValueOnce([mockSwim])
    
    const result = swimController.getAllSwims()
    expect(mockedDatabase.getAllData).toHaveBeenCalled()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([mockSwim])
  }) 
})

describe('createSwim', () => {
  it('saves a new swim object with ID', () => {
    const date = new Date("1/1/22")
    const swimObject = { id: 1, lengths: 60, pool: "Local Pool", date: date }
    mockedDatabase.getAllData.mockReturnValueOnce([])

    swimController.createSwim(60, "Local Pool", date)
    expect(mockedDatabase.saveData).toHaveBeenCalledWith(swimObject)
  })

  it('generates sequential IDs', () => {
    const date = new Date("2/2/22")
    const swimObject = { id: 1, lengths: 70, pool: "Olympic Pool", date: date }
    const date2 = new Date("3/3/22")
    const swimObject2 = { id: 2, lengths: 40, pool: "Local Pool", date: date2 }

    mockedDatabase.getAllData.mockReturnValueOnce([])
    swimController.createSwim(70, "Olympic Pool", date)
    expect(mockedDatabase.saveData).toHaveBeenCalledWith(swimObject)

    mockedDatabase.getAllData.mockReturnValueOnce([swimObject])
    swimController.createSwim(40, "Local Pool", date2)
    expect(mockedDatabase.saveData).toHaveBeenCalledWith(swimObject2)
  })
})