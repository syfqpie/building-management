import { Pipe, PipeTransform } from '@angular/core';
import { TicketCategory } from '../../services/ticket/ticket.model';

/**
 * Transforms an integer to a string representative of TicketCategory
 * @see `TicketCategory`
 *
 * ### Pre-defined options
 *
 * | Option               | Value            | String representative |
 * |----------------------|------------------|-----------------------|
 * | TicketCategory.SYS   | 1                | System                |
 * | TicketCategory.UNIT  | 2                | Unit                  |
 * | TicketCategory.FACI  | 3                | Facility              |
 * | Else                 | Other than above | N/A                   |
 * 
 */
@Pipe({
  name: 'ticketCategory'
})
export class TicketCategoryPipe implements PipeTransform {

  transform(value: TicketCategory | undefined, ...args: unknown[]): string {
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
