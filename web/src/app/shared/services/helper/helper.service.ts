import { Injectable } from '@angular/core';

/**
 * A helper service for global use
 */
@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  /**
   * Get a new object containing only the changed field values
   * 
   * @param obj1 - original object
   * @param obj2 - updated object
   * 
   * @returns New object containing changed field values
   */
  getUpdatedObj(obj1: any, obj2: any) {
    let newForm: any = {}

    // Iterate to get changed values
    Object.keys(obj2).forEach(
      (key) => {
        if (!this.isEqual(obj1[key], obj2[key])) {
          newForm[key] = obj2[key]
        }
      }
    )
    
    // Return filtered values
    return newForm
  }

  /**
   * Check if two objects are equal 
   * 
   * Copied from https://github.com/epoberezkin/fast-deep-equal/blob/master/src/index.jst
   * 
   * @param obj1 - first object to compare
   * @param obj2 - second object to compare
   * 
   * @returns true or false
   */
  isEqual(obj1: any, obj2: any) {
    // Not object
    if (obj1 === obj2) return true

    if (obj1 && obj2 && typeof obj1 === 'object' && typeof obj2 === 'object') {
      // Check constructor
      // if (obj1.constructor === obj2.constructor) return false

      // Check array
      if (Array.isArray(obj1)) {
        const arrLength = obj1.length;
        if (arrLength != obj2.length) return false

        const sortedObj1 = obj1.sort()
        const sortedObj2 = obj2.sort()

        for (let i = arrLength; i-- !== 0;)
          if (!this.isEqual(sortedObj1[i], sortedObj2[i])) return false

        return true
      }
      
      if (obj1.valueOf !== Object.prototype.valueOf) return obj1.valueOf() === obj2.valueOf()
      if (obj1.toString !== Object.prototype.toString) return obj1.toString() === obj2.toString()

      const objKeys = Object.keys(obj1)
      const keyLength = objKeys.length

      if (keyLength !== Object.keys(obj2).length) return false

      for (let i = keyLength; i-- !== 0;)
        if (!Object.prototype.hasOwnProperty.call(obj2, objKeys[i])) return false

      for (let i = keyLength; i-- !== 0;) {
        var key = objKeys[i];
        if (!this.isEqual(obj1[key], obj2[key])) return false
      }

      return true
    }

    // true if both NaN, false otherwise
    return obj1 !== obj1 && obj2 !== obj2
  }

}
