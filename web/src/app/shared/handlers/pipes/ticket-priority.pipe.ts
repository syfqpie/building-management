import { Pipe, PipeTransform } from '@angular/core';
import { TicketPriority } from '../../services/tickets/tickets.model';

@Pipe({
  name: 'ticketPriority'
})
export class TicketPriorityPipe implements PipeTransform {

  transform(value: TicketPriority | undefined, ...args: unknown[]): unknown {
    if (value) {
      return value === TicketPriority.CRIT ? 'Critical' :
        value === TicketPriority.HIGH ? 'High' :
        value === TicketPriority.NORMAL ? 'Normal' :
        value === TicketPriority.LOW ? 'Low' :
        value === TicketPriority.VLOW ? 'Very low' :
        'N/A'
    } else {
      return 'N/A'
    }
  }

}
