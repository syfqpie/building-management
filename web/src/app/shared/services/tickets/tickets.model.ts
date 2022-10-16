import { UnitNo } from '../units/units.model';
import { UserEmail } from '../user/user.model';

export class Ticket {
    constructor(
        public id: number,
        public ticketNo: string,
        public title: string,
        public description: string,
        public unit: number,
        public tags: number[],
        public status: number,
        public category: number,
        public assignee: number,
        public priority: number,
        public createdAt: string,
        public createdBy: number,
        public lastModifiedAt: string,
        public lastModifiedBy: number
    ) {}
}

export class TicketExtended {
    constructor(
        public id: number,
        public ticketNo: string,
        public title: string,
        public description: string,
        public unit: UnitNo,
        public tags: number[],
        public status: number,
        public category: number,
        public assignee: UserEmail,
        public priority: number,
        public ticketActivities: TicketActivity[],
        public createdAt: string,
        public createdBy: number,
        public lastModifiedAt: string,
        public lastModifiedBy: number
    ) {}
}

export class TicketTag {
    constructor(
        public id: number,
        public tag: string,
        public createdAt: string,
        public createdBy: number,
        public lastModifiedAt: string,
        public lastModifiedBy: number
    ) {}
}

export class TicketActivity {
    constructor(
        public id: number,
        public ticket: number,
        public status: number,
        public notes: string,
        public createdAt: string,
        public createdBy: number
    ) {}
}

export class TicketComment {
    constructor(
        public id: number,
        public replyTo: number,
        public comment: string,
        public createdAt: string,
        public createdBy: number
    ) {}
}

export class TicketCommentExtended {
    constructor(
        public id: number,
        public replyTo: number,
        public comment: string,
        public createdAt: string,
        public createdBy: UserEmail
    ) {}
}

export class TicketOverview {
    constructor(
        public tickets: CountPercentage,
        public opened: CountPercentage,
        public inProgress: CountPercentage,
        public completed: CountPercentage
    ) {}
}

interface CountPercentage {
    count: number,
    percentage: number
}

export enum TicketStatus {
    OPENED = 1,
    IN_PROGRESS = 2,
    RESOLVED = 3,
    CLOSED = 4,
    DUPLICATED = 5
}

export enum TicketPriority {
    CRIT = 1,
    HIGH = 2,
    NORMAL = 3,
    LOW = 4,
    VLOW = 5
}

export enum TicketCategory {
    SYS = 1,
    UNIT = 2,
    FACI = 3
}