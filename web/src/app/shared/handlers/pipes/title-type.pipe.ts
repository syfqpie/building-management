import { Pipe, PipeTransform } from '@angular/core';
import { TitleType } from '../../services/resident/resident.model';

/**
 * Transforms an integer to a string representative of TitleType
 * @see `TitleType`
 *
 * ### Pre-defined options
 *
 * | Option             | Value            | String representative  |
 * |--------------------|------------------|------------------------|
 * | TitleType.MR       | 1                | Car                    |
 * | TitleType.MRS      | 2                | Motorcycle             |
 * | TitleType.MS       | 3                | Lorry                  |
 * | Else               | Other than above | N/A                    |
 * 
 */
@Pipe({
  name: 'titleType'
})
export class TitleTypePipe implements PipeTransform {

  transform(value: TitleType | undefined, ...args: unknown[]): string {
    if (value) {
      return value === TitleType.MR ? 'Mr.' :
        value === TitleType.MRS ? 'Mrs.' :
        'Ms.'
    } else {
      return 'N/A'
    }
  }

}
