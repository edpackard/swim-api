export const isSwimValid = (object: any): boolean => {
  if (object.date instanceof Date) { return true } 
  return false
}