import { Pipe, PipeTransform } from '@angular/core';
import { ActivityType } from '../../services/activities/activities.model';

@Pipe({
  name: 'activityType'
})
export class ActivityTypePipe implements PipeTransform {

  transform(value: ActivityType | undefined, ...args: unknown[]): unknown {
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
