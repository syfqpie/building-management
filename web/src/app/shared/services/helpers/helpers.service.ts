import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  getFormChangedValuesOnly(source: any, usedForm: any) {
    let newForm: any = {}
    Object.keys(usedForm).forEach(
      (key) => {
        if (source[key] !== usedForm[key]) {
          newForm[key] = usedForm[key]
        }
      }
    )

    return newForm
  }
}
