import { Pipe, PipeTransform } from '@angular/core';

/**
 * Transforms boolean to a string representative
 *
 * ### Pre-defined options
 *
 * | Value      | String representative  |
 * |------------|------------------------|
 * | true       | Active                 |
 * | false      | Inactive               |
 * | null       | -                      |
 * | undefined  | -                      |
 * 
 */
@Pipe({
  name: 'isActivePipe'
})
export class IsActivePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {
    return value === true ? 'Active' : value !== true ? 'Inactive' : '-'
  }

}
