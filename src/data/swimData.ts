import { Swim } from '../models/SwimModel'

const data: Array<Swim> = [{ id: 1, lengths: 60, pool: "test data", date: new Date}]

export const getData = (): Array<Swim> => {
    return data
  }

export const saveData = (object: Swim) => {
    data.push(object)
  }