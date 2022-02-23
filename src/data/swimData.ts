import { Swim } from '../models/SwimModel'

const data: Array<Swim> = []

export const getData = (): Array<Swim> => {
    return data
  }

export const saveData = (object: Swim) => {
    data.push(object)
  }