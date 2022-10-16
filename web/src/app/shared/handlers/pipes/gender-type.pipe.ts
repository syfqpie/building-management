import { Pipe, PipeTransform } from '@angular/core';
import { GenderType } from '../../services/resident/resident.model';

/**
 * Transforms an integer to a string representative of GenderType
 * @see `GenderType`
 *
 * ### Pre-defined options
 *
 * | Option                  | Value            | String representative  |
 * |-------------------------|------------------|------------------------|
 * | GenderType.FEMALE       | 1                | Car                    |
 * | GenderType.MALE         | 2                | Motorcycle             |
 * | Else                    | Other than above | N/A                    |
 * 
 */
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
