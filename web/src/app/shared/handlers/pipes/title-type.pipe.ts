import { Pipe, PipeTransform } from '@angular/core';
import { TitleType } from '../../services/renters/renters.model';

@Pipe({
  name: 'titleType'
})
export class TitleTypePipe implements PipeTransform {

  transform(value: TitleType | undefined, ...args: unknown[]): unknown {
    if (value) {
      return value === TitleType.MR ? 'Mr.' :
        value === TitleType.MRS ? 'Mrs.' :
        'Ms.'
    } else {
      return 'N/A'
    }
  }

}
