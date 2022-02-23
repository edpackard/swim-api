import Controller from '../controllers/swimController'

describe('getAllSwims', () => {
  it('returns an empty array if no swims recorded', () => {
  const result = Controller.getAllSwims()
  expect(result.length).toBe(0)
  expect(result).toStrictEqual([])
  });
})