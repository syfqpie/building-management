import { Pipe, PipeTransform } from '@angular/core';
import { TicketStatus } from '../../services/tickets/tickets.model';

@Pipe({
  name: 'ticketStatus'
})
export class TicketStatusPipe implements PipeTransform {

  transform(value: TicketStatus | undefined, ...args: unknown[]): string {
    if (value) {
      return value === TicketStatus.OPENED ? 'Opened' :
        value === TicketStatus.IN_PROGRESS ? 'In progress' :
        value === TicketStatus.RESOLVED ? 'Resolved' :
        value === TicketStatus.CLOSED ? 'Closed' :
        value === TicketStatus.DUPLICATED ? 'Duplicated' :
        'N/A'
    } else {
      return 'N/A'
    }
  }

}
