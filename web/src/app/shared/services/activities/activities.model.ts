import { UnitNo } from '../units/units.model';
import { UserEmail } from '../user/user.model';

export class UnitActivity {
    constructor(
        public id: number,
        public notes: string,
        public unit: UnitNo,
        public activityType: number,
        public activityAt: string,
        public activityBy: UserEmail
    ) {}
}

export class UnitActivityNested {
    constructor(
        public id: number,
        public notes: string,
        public activityType: number,
        public activityAt: string,
        public activityBy: UserEmail
    ) {}
}

export enum ActivityType {
    MOVE_IN = 1,
    MOVE_OUT = 2,
    ACTIVATE = 3,
    DEACTIVATE = 4,
    ENABLE_MAINTENANCE = 5,
    DISABLE_MAINTENANCE = 6,
}