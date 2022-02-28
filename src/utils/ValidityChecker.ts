class ValidityChecker {

  isSwimValid (object: any): boolean {
    if (object.date instanceof Date &&
      typeof object.pool === 'string' &&
      typeof object.lengths === 'number' &&
      typeof object.id === 'number') 
    { 
      return true 
    } 
    return false
  }
  
}

export default ValidityChecker

