import Controller from '../controllers/swimController'
import swimData from '../data/swimData'

describe('getAllSwims', () => {

  let mockData: jest.SpyInstance
  mockData = jest.spyOn(swimData, 'data')

  it('returns an empty array if no swims stored', () => {
  mockData.mockReturnValue([])
  const result = Controller.getAllSwims()
  expect(result.length).toBe(0)
  expect(result).toStrictEqual([])
  });

  it('returns array with swims if objects stored', () => {
  const MockSwim = { lengths: 50, pool: "Lido", date: "2021-03-14T00:00:00.000Z"}
  mockData.mockReturnValue([MockSwim])
  const result = Controller.getAllSwims()
  expect(result.length).toBe(1)
  expect(result).toStrictEqual([MockSwim])
  })
})