import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isActivePipe'
})
export class IsActivePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value === true ? 'Active' : value !== true ? 'Inactive' : '-'
  }

}
