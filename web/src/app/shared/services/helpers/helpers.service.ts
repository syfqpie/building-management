import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  /**
   * Get a new object containing only the changed field values
   */
  getFormChangedValuesOnly(source: any, usedForm: any) {
    let newForm: any = {}

    // Iterate to get changed values
    Object.keys(usedForm).forEach(
      (key) => {
        if (source[key] !== usedForm[key]) {
          newForm[key] = usedForm[key]
        }
      }
    )
    
    // Return filtered values
    return newForm
  }

}
