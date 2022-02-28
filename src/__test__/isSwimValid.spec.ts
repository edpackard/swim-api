import { isSwimValid } from '../utils/isSwimValid'

describe('isSwimValid', () => {
  it('returns true for a valid swim object', () => {
    const date = new Date('2/2/22')
    const swimObject = {id: 1, lengths: 200, pool: 'New Pool', date: date}
    expect(isSwimValid(swimObject)).toBe(true)
  })
})