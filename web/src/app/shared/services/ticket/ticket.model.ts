import { UnitNo } from '../unit/unit.model';
import { UserEmail } from '../user/user.model';

/**
 * A base class for the ticket entity.
 *
 * @category Model
 */
export class Ticket {
    /**
     * The constructor of the `Ticket` class.
     *
     * @param id the ticket's database ID
     * @param ticketNo the ticket's ticket no.
     * @param title the ticket's title
     * @param description the ticket's name
     * @param unit the ticket's related unit ID
     * @param tags the ticket's related tags ID
     * @param status the ticket's status
     * @param category the ticket's category
     * @param priority the ticket's current priority
     * @param assignee the ticket's assignee ID
     * @param createdAt the ticket's entry creation date and time
     * @param createdBy the ticket's entry creator ID
     * @param lastModifiedAt the ticket's entry last modification date and time
     * @param lastModifiedBy the ticket's entry last modificator ID
     */
    constructor(
        public id: number,
        public ticketNo: string,
        public title: string,
        public description: string,
        public unit: number,
        public tags: number[],
        public status: TicketStatus,
        public category: TicketCategory,
        public priority: TicketPriority,
        public assignee: number,
        public createdAt: string,
        public createdBy: number,
        public lastModifiedAt: string,
        public lastModifiedBy: number
    ) {}
}

/**
 * A class that extends {@link Ticket | `Ticket`}.
 */
export class TicketExtended {
    /**
     * The constructor of the `TicketExtended` class.
     *
     * @param id the ticket's database ID
     * @param ticketNo the ticket's ticket no.
     * @param title the ticket's title
     * @param description the ticket's name
     * @param unit the ticket's related unit information
     * @param tags the ticket's related tags ID
     * @param status the ticket's status
     * @param category the ticket's category
     * @param priority the ticket's current priority
     * @param assignee the ticket's assignee information
     * @param ticketActivities the ticket's activities
     * @param createdAt the ticket's entry creation date and time
     * @param createdBy the ticket's entry creator ID
     * @param lastModifiedAt the ticket's entry last modification date and time
     * @param lastModifiedBy the ticket's entry last modificator ID
     */
    constructor(
        public id: number,
        public ticketNo: string,
        public title: string,
        public description: string,
        public unit: UnitNo,
        public tags: number[],
        public status: TicketStatus,
        public category: TicketCategory,
        public priority: TicketPriority,
        public assignee: UserEmail,
        public ticketActivities: TicketActivity[],
        public createdAt: string,
        public createdBy: number,
        public lastModifiedAt: string,
        public lastModifiedBy: number
    ) {}
}

/**
 * A base class for the ticket tag entity.
 *
 * @category Model
 */
export class TicketTag {
    /**
     * The constructor of the `TicketTag` class.
     *
     * @param id the tag's database ID
     * @param tag the tag's tag name
     * @param createdAt the tag's entry creation date and time
     * @param createdBy the tag's entry creator ID
     * @param lastModifiedAt the tag's entry last modification date and time
     * @param lastModifiedBy the tag's entry last modificator ID
     */
    constructor(
        public id: number,
        public tag: string,
        public createdAt: string,
        public createdBy: number,
        public lastModifiedAt: string,
        public lastModifiedBy: number
    ) {}
}

/**
 * A base class for the ticket activity entity.
 *
 * @category Model
 */
export class TicketActivity {
    /**
     * The constructor of the `TicketActivity` class.
     *
     * @param id the activity's database ID
     * @param ticket the activity's related ticket ID
     * @param status the activity's current status
     * @param notes the activity's notes
     * @param createdAt the activity's entry creation date and time
     * @param createdBy the activity's entry creator ID
     */
    constructor(
        public id: number,
        public ticket: number,
        public status: TicketStatus,
        public notes: string,
        public createdAt: string,
        public createdBy: number
    ) {}
}

/**
 * A base class for the ticket comment entity.
 *
 * @category Model
 */
export class TicketComment {
    /**
     * The constructor of the `TicketComment` class.
     *
     * @param id the comment's database ID
     * @param replyTo the comment's related comment ID if any
     * @param comment the comment's comment
     * @param createdAt the comment's entry creation date and time
     * @param createdBy the comment's entry creator ID
     */
    constructor(
        public id: number,
        public replyTo: number,
        public comment: string,
        public createdAt: string,
        public createdBy: number
    ) {}
}

/**
 * A class that extends {@link TicketComment | `TicketComment`}.
 */
export class TicketCommentExtended {
    /**
     * The constructor of the `TicketCommentExtended` class.
     *
     * @param id the comment's database ID
     * @param replyTo the comment's related comment ID if any
     * @param comment the comment's comment
     * @param createdAt the comment's entry creation date and time
     * @param createdBy the comment's entry creator information
     */
    constructor(
        public id: number,
        public replyTo: number,
        public comment: string,
        public createdAt: string,
        public createdBy: UserEmail
    ) {}
}

/**
 * A base class for the ticket overview
 *
 * @category Model
 */
export class TicketOverview {
    /**
     * The constructor of the `TicketOverview` class.
     *
     * @param tickets the total tickets
     * @param opened the opened tickets
     * @param inProgress the in progress tickets
     * @param completed the completed tickets
     */
    constructor(
        public tickets: CountPercentage,
        public opened: CountPercentage,
        public inProgress: CountPercentage,
        public completed: CountPercentage
    ) {}
}

/**
 * An interface for count percentage.
 * 
 * Used in chart
 */
interface CountPercentage {
    /** The total count */
    count: number,

    /** The total percentage */
    percentage: number
}

/**
 * An enum for ticket status
 */
export enum TicketStatus {
    /** An opened status ticket */
    OPENED = 1,
    
    /** An in progress status ticket */
    IN_PROGRESS = 2,

    /** A resolved status ticket */
    RESOLVED = 3,

    /** A closed status ticket */
    CLOSED = 4,

    /** A duplicated status ticket */
    DUPLICATED = 5
}

/**
 * An enum for ticket priorities
 */
export enum TicketPriority {
    /** A critical priority ticket */
    CRIT = 1,

    /** A high priority ticket */
    HIGH = 2,

    /** A normal priority ticket */
    NORMAL = 3,

    /** A low priority ticket */
    LOW = 4,

    /** A very low priority ticket */
    VLOW = 5
}

/**
 * An enum for ticket categories
 */
export enum TicketCategory {
    /** A system category ticket */
    SYS = 1,

    /** A unit category ticket */
    UNIT = 2,

    /** A facility category ticket */
    FACI = 3
}