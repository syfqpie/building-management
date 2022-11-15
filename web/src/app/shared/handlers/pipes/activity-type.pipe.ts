import { Pipe, PipeTransform } from '@angular/core';
import { ActivityType } from '../../services/activity/activity.model';

/**
 * Transforms an integer to a string representative of ActivityType
 * @see `ActivityType`
 *
 * ### Pre-defined options
 *
 * | Option                            | Value            | String representative |
 * |-----------------------------------|------------------|-----------------------|
 * | ActivityType.MOVE_IN              | 1                | Moved in              |
 * | ActivityType.MOVE_OUT             | 2                | Moved out             |
 * | ActivityType.ACTIVATE             | 3                | Activated             |
 * | ActivityType.DEACTIVATE           | 4                | Deactivated           |
 * | ActivityType.ENABLE_MAINTENANCE   | 5                | Enabled maintenance   |
 * | ActivityType.DISABLE_MAINTENANCE  | 6                | Disabled maintenance  |
 * | Else                              | Other than above | N/A                   |
 * 
 */
@Pipe({
  name: 'activityType'
})
export class ActivityTypePipe implements PipeTransform {

  transform(value: ActivityType | undefined, ...args: unknown[]): string {
    if (value) {
      return value === ActivityType.MOVE_IN ? 'Moved in' :
        value === ActivityType.MOVE_OUT ? 'Moved out' :
        value === ActivityType.ACTIVATE ? 'Activated' :
        value === ActivityType.DEACTIVATE ? 'Deactivated' :
        value === ActivityType.ENABLE_MAINTENANCE ? 'Enabled maintenance' :
        value === ActivityType.DISABLE_MAINTENANCE ? 'Disabled maintenance' :
        'N/A'
    } else {
      return 'N/A'
    }
  }

}
