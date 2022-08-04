import { Pipe, PipeTransform } from '@angular/core';
import { TicketCategory } from '../../services/tickets/tickets.model';

@Pipe({
  name: 'ticketCategory'
})
export class TicketCategoryPipe implements PipeTransform {

  transform(value: TicketCategory | undefined, ...args: unknown[]): unknown {
    if (value) {
      return value === TicketCategory.SYS ? 'System' :
        value === TicketCategory.UNIT ? 'Unit' :
        value === TicketCategory.FACI ? 'Facility' :
        'N/A'
    } else {
      return 'N/A'
    }
  }

}
