import { Pipe, PipeTransform } from '@angular/core';
import { GenderType } from '../../services/residents/residents.model';

@Pipe({
  name: 'genderType'
})
export class GenderTypePipe implements PipeTransform {

  transform(value: GenderType | undefined, ...args: unknown[]): string {
    if (value) {
      return value === GenderType.FEMALE ? 'Female' :
        'Male'
    } else {
      return 'N/A'
    }
  }

}
