import { Resident } from '../residents/residents.model';
import { UserEmail } from '../users/users.model';

export class Unit {
    constructor(
        public id: number,
        public unitNo: string,
        public squareFeet: number,
        public block: number,
        public floor: number,
        public owner: number,
        public unitNumber: number,
        public isMaintenance: number,
        public isActive: boolean,
        public createdAt: string,
        public createdBy: number,
        public lastModifiedAt: string,
        public lastModifiedBy: number
    ) {}
}

export class UnitExtended {
    constructor(
        public id: number,
        public unitNo: string,
        public squareFeet: number,
        public block: number,
        public floor: number,
        public owner: Resident,
        public unitNumber: number,
        public isMaintenance: number,
        public isActive: boolean,
        public createdAt: string,
        public createdBy: number,
        public lastModifiedAt: string,
        public lastModifiedBy: number
    ) {}
}

export class UnitActivity {
    constructor(
        public id: number,
        public notes: string,
        public activityType: number,
        public activityAt: string,
        public currentOwner: number,
        public activityBy: number,
        public unit?: number
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