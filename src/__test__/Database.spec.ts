import Database from '../data/Database'

let db: Database;

beforeEach(() => {
  db = new Database()
})

describe('saveData', () => {
  it('stores a new object in database', () => {
    const swimObject = { id: 1, lengths: 40, pool: "Ironmonger Row", date: new Date('1/1/11')}
    
    db.saveData(swimObject)
    expect(db.getAllData()[0]).toBe(swimObject)
  })
})

describe ('getAllData', () => {
  it('should be empty on initialisation', () => {
    expect(db.getAllData()).toStrictEqual([])
  })
})

describe ('getData', () => {
  it('retrieves an object from database by ID', () => {
    const swimObject = { id: 1, lengths: 40, pool: "Ironmonger Row", date: new Date('1/1/11').toISOString() }
    const swimObject2 = { id: 2, lengths: 40, pool: "Leisure Centre", date: new Date('2/2/13').toISOString() }
    const swimObject3 = { id: 3, lengths: 99, pool: "Serpentine", date: new Date('9/9/14').toISOString() }
    
    db.saveData(swimObject)
    db.saveData(swimObject2)
    db.saveData(swimObject3)

    expect(db.getData(1)).toStrictEqual(swimObject)
    expect(db.getData(2)).toStrictEqual(swimObject2)
    expect(db.getData(3)).toStrictEqual(swimObject3)
  })

  it('returns error if object ID does not exist in database', () => {
    const swimObject = { id: 1, lengths: 40, pool: "Ironmonger Row", date: new Date('1/1/11').toISOString() }
    const swimObject2 = { id: 2, lengths: 40, pool: "Leisure Centre", date: new Date('2/2/13').toISOString() }

    db.saveData(swimObject)
    db.saveData(swimObject2)

    expect(() => {db.getData(3)}).toThrow('ID not found')
  })

  it('handles non-sequential ids', () => {
    const swimObject1 = { id: 21, lengths: 45, pool: "Spa Pool", date: new Date('1/2/17').toISOString() }
    const swimObject2 = { id: 45, lengths: 52, pool: "Public Pool", date: new Date('1/2/18').toISOString() }
    
    db.saveData(swimObject1)
    db.saveData(swimObject2)

    expect(db.getData(21)).toStrictEqual(swimObject1)
    expect(db.getData(45)).toStrictEqual(swimObject2)
  })
})

describe('deleteData', () => {
  it('removes an item from database by ID', () => {
    const swimObject = { id: 1, lengths: 200, pool: "Paddling Pool", date: new Date('3/3/13').toISOString() }
    db.saveData(swimObject)
    const swimObject2 = { id: 2, lengths: 300, pool: "Paddling Pool", date: new Date('4/4/14').toISOString() }
    db.saveData(swimObject2)
    
    db.deleteData(1)
    
    const allData = db.getAllData()
    expect(allData).toHaveLength(1)
    expect(allData).toStrictEqual([swimObject2])
  })

  it('handles non-sequential IDs', () => {
    const swimObject = { id: 32, lengths: 200, pool: "Paddling Pool", date: new Date('3/3/13').toISOString() }
    db.saveData(swimObject)
    const swimObject2 = { id: 54, lengths: 300, pool: "Paddling Pool", date: new Date('4/4/14').toISOString() }
    db.saveData(swimObject2)

    db.deleteData(32)

    const allData = db.getAllData()
    expect(allData).toHaveLength(1)
    expect(allData).toStrictEqual([swimObject2])

  })

  it('returns error if object ID does not exist in database', () => {
    const swimObject = { id: 1, lengths: 40, pool: "Ironmonger Row", date: new Date('1/1/11').toISOString() }
    const swimObject2 = { id: 2, lengths: 40, pool: "Leisure Centre", date: new Date('2/2/13').toISOString() }

    db.saveData(swimObject)
    db.saveData(swimObject2)

    expect(() => {db.deleteData(3)}).toThrow('ID not found')
  })
})

describe('updateData', () => {
  it('updates a db item', () => {
    const swimObject = { id: 1, lengths: 2000, pool: "Leisure Pool", date: new Date('5/5/15').toISOString() }
    db.saveData(swimObject)
    const updatedObject = { id: 1, lengths: 200, pool: "Competition Pool", date: new Date('5/6/15').toISOString() }

    db.updateData(updatedObject)
    expect(db.getData(1)).toEqual(updatedObject)

    const swimObject2 = { id: 2, lengths: 320, pool: "Olympic Pool", date: new Date('5/6/16').toISOString() }
    db.saveData(swimObject2)
    const updatedObject2 = { id: 2, lengths: 420, pool: "Olympic Pool", date: new Date('5/7/16').toISOString() }

    db.updateData(updatedObject2)
    expect(db.getData(2)).toEqual(updatedObject2)
  })

  it('throws error if ID does not exist', () => {
    const swimObject = { id: 1, lengths: 2000, pool: "Paddling Pool", date: new Date('5/5/15').toISOString() }
    db.saveData(swimObject)
    const updatedObject = { id: 2, lengths: 100, pool: "Olympic Pool", date: new Date('3/7/16').toISOString() }

    expect(() => {db.updateData(updatedObject)}).toThrowError('ID not found')
    expect(db.getData(1)).toEqual(swimObject)
  })
})
