import { UnitNo } from '../unit/unit.model';
import { UserEmail } from '../user/user.model';

/**
 * A base class for the unit activity entity.
 *
 * @category Model
 */
export class UnitActivity {
    /**
     * The constructor of the `UnitActivity` class.
     *
     * @param id the unit activity's database ID
     * @param notes the unit activity's notes
     * @param unit the unit activity's unit
     * @param activityType the unit activity's type {@link ActivityType}
     * @param activityAt the unit activity's entry creation date and time
     * @param activityBy the unit activity's entry creator simplied information
     */
    constructor(
        public id: number,
        public notes: string,
        public unit: UnitNo,
        public activityType: ActivityType,
        public activityAt: string,
        public activityBy: UserEmail
    ) {}
}

/**
 * A custom class for the unit activity entity.
 *
 * @category Model
 */
export class UnitActivityNested {
    /**
     * The constructor of the `UnitActivityNested` class.
     *
     * @param id the unit activity's database ID
     * @param notes the unit activity's notes
     * @param activityType the unit activity's type {@link ActivityType}
     * @param activityAt the unit activity's entry creation date and time
     * @param activityBy the unit activity's entry creator simplied information
     */
    constructor(
        public id: number,
        public notes: string,
        public activityType: ActivityType,
        public activityAt: string,
        public activityBy: UserEmail
    ) {}
}

/**
 * An enum for activity types
 */
export enum ActivityType {
    /** A move in type activity */
    MOVE_IN = 1,

    /** A move out type activity */
    MOVE_OUT = 2,

    /** An activate type activity */
    ACTIVATE = 3,

    /** A deactivate type activity */
    DEACTIVATE = 4,

    /** An enable maintenance type activity */
    ENABLE_MAINTENANCE = 5,

    /** A disable maintenance type activity */
    DISABLE_MAINTENANCE = 6,
}