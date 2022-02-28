import { isSwimValid } from '../utils/isSwimValid'

describe('isSwimValid', () => {
  it('returns true for a valid swim object', () => {
    const date = new Date('2/2/22')
    const swimObject = { id: 1, lengths: 200, pool: 'New Pool', date: date }
    expect(isSwimValid(swimObject)).toBe(true)
  })

  it('returns false for an invalid swim object', () => {
    const date = new Date('2/2/22')
    const badObject1 = { id: 1, lengths: 200, pool: 'New Pool', date: 'NotADate' }
    const badObject2 = { id: 1, lengths: 200, pool: true, date: date }
    const badObject3 = { id: 1, lengths: "200", pool: 'New Pool', date: date }
    const badObject4 = { id: null, lengths: 200, pool: 'New Pool', date: date }
    
    expect(isSwimValid(badObject1)).toBe(false)
    // expect(isSwimValid(badObject2)).toBe(false)
    // expect(isSwimValid(badObject3)).toBe(false)
    // expect(isSwimValid(badObject4)).toBe(false)
  })
})