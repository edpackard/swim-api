class ValidityChecker {

  isSwimValid (testObject: any): boolean {
    if (this._isDate(testObject.date) &&
      typeof testObject.pool === 'string' &&
      typeof testObject.lengths === 'number' &&
      typeof testObject.id === 'number') 
    { 
      return true 
    } 
    return false
  }

  _isDate (testString: string): boolean {
    const testDate: any = new Date(testString)
    return testString !== null && 
      (testDate !== "Invalid Date") && 
      !isNaN(testDate);
  }
}

export default ValidityChecker
