import { Pipe, PipeTransform } from '@angular/core';
import { TicketPriority } from '../../services/ticket/ticket.model';

/**
 * Transforms an integer to a string representative of TicketPriority
 * @see `TicketPriority`
 *
 * ### Pre-defined options
 *
 * | Option                 | Value            | String representative |
 * |------------------------|------------------|-----------------------|
 * | TicketPriority.CRIT    | 1                | Critical              |
 * | TicketPriority.HIGH    | 2                | High                  |
 * | TicketPriority.NORMAL  | 3                | Normal                |
 * | TicketPriority.LOW     | 4                | Low                   |
 * | TicketPriority.VLOW    | 5                | Very low              |
 * | Else                   | Other than above | N/A                   |
 * 
 */
@Pipe({
  name: 'ticketPriority'
})
export class TicketPriorityPipe implements PipeTransform {

  transform(value: TicketPriority | undefined, ...args: unknown[]): string {
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
