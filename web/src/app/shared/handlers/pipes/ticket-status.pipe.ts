import { Pipe, PipeTransform } from '@angular/core';
import { TicketStatus } from '../../services/ticket/ticket.model';

/**
 * Transforms an integer to a string representative of TicketStatus
 * @see `TicketStatus`
 *
 * ### Pre-defined options
 *
 * | Option                     | Value            | String representative |
 * |----------------------------|------------------|-----------------------|
 * | TicketStatus.OPENED        | 1                | Opened                |
 * | TicketStatus.IN_PROGRESS   | 2                | In progress           |
 * | TicketStatus.RESOLVED      | 3                | Resolved              |
 * | TicketStatus.CLOSED        | 4                | Closed                |
 * | TicketStatus.DUPLICATED    | 5                | Duplicated            |
 * | Else                       | Other than above | N/A                   |
 * 
 */
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
