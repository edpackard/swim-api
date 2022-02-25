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
    const swimObject = { id: 1, lengths: 40, pool: "Ironmonger Row", date: new Date('1/1/11') }
    const swimObject2 = { id: 2, lengths: 40, pool: "Leisure Centre", date: new Date('2/2/13') }
    const swimObject3 = { id: 3, lengths: 99, pool: "Serpentine", date: new Date('9/9/14') }
    
    db.saveData(swimObject)
    db.saveData(swimObject2)
    db.saveData(swimObject3)

    expect(db.getData(1)).toStrictEqual(swimObject)
    expect(db.getData(2)).toStrictEqual(swimObject2)
    expect(db.getData(3)).toStrictEqual(swimObject3)
  })
})

describe('deleteData', () => {
  it('removes an item from database by ID', () => {
    const swimObject = { id: 1, lengths: 200, pool: "Paddling Pool", date: new Date('3/3/13') }
    db.saveData(swimObject)
    const swimObject2 = { id: 2, lengths: 300, pool: "Paddling Pool", date: new Date('4/4/14') }
    db.saveData(swimObject2)
    
    db.deleteData(1)
    
    const allData = db.getAllData()
    expect(allData).toHaveLength(1)
    expect(allData).toStrictEqual([swimObject2])
  })

describe('updateData', () => {
  it('updates a db item', () => {
    const swimObject = { id: 1, lengths: 2000, pool: "Leisure Pool", date: new Date('5/5/15') }
    db.saveData(swimObject)
    const updatedObject = { id: 1, lengths: 200, pool: "Competition Pool", date: new Date('5/6/15') }

    db.updateData(updatedObject)
    expect(db.getData(1)).toEqual(updatedObject)
    
  })
})
})