import swimController from '../controllers/swimController'
import * as database from '../data/swimData'

jest.mock('../data/swimData')
const mockedDatabase = database as jest.Mocked<typeof database>

describe('getAllSwims', () => {

  it('returns an empty array if no swims stored', () => {
  mockedDatabase.getData.mockReturnValue([])
  const result = swimController.getAllSwims()
  expect(mockedDatabase.getData).toHaveBeenCalled()
  expect(result.length).toBe(0)
  expect(result).toStrictEqual([])
  });

  it('returns array with swims if objects stored', () => {
  const mockSwim = { lengths: 40, pool: 'Lido', date: new Date ("1/22/22") }
  mockedDatabase.getData.mockReturnValue([mockSwim])
  const result = swimController.getAllSwims()
  expect(mockedDatabase.getData).toHaveBeenCalled()
  expect(result.length).toBe(1)
  expect(result).toStrictEqual([mockSwim])
  }) 
})

describe('createSwim', () => {
  it('saves a new swim object', () => {
  const date = new Date("1/1/22")
  const swimObject = { lengths: 60, pool: "Local Pool", date: date }
  swimController.createSwim(60, "Local Pool", date )
  expect(mockedDatabase.saveData).toHaveBeenCalledWith(swimObject)
  })
})