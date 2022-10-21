/**
 * A base class for the resident entity.
 *
 * @category Model
 */
export class Resident {
    /**
     * The constructor of the `Resident` class.
     *
     * @param id the resident's database ID
     * @param residentNo the resident's generated no.
     * @param title the resident's title {@link Title}
     * @param name the resident's name
     * @param phoneNo the resident's phone no.
     * @param email the resident's email
     * @param nric the resident's NRIC
     * @param gender the resident's gender {@link Gender}
     * @param isOwner the resident is a unit or not? 
     * @param isActive the resident is active or not?
     * @param residentUser the resident's user account ID
     * @param lastPaymentAt the resident's last payment date and time 
     * @param createdAt the resident's entry creation date and time 
     * @param lastModifiedAt the resident's entry last modification date and time
     * @param lastModifiedBy the resident's entry last modificator ID
     */
    constructor(
        public id: number,
        public residentNo: string,
        public isOwner: boolean,
        public name: string,
        public phoneNo: string,
        public email: string,
        public isActive: boolean,
        public createdAt: string,
        public title?: TitleType,
        public nric?: string,
        public gender?: GenderType,
        public lastPaymentAt?: string,
        public residentUser?: number,
        public lastModifiedAt?: string,
        public lastModifiedBy?: string,
    ) {}
}

/**
 * An enum for title types
 */
export enum TitleType {
    /** A mister type title */
    MR = 1,

    /** A missus type title */
    MRS = 2,

    /** A miss type title */
    MS = 3,
}

/**
 * An enum for gender types
 */
export enum GenderType {
    /** A female type gender */
    FEMALE = 1,

    /** A male type gender */
    MALE = 2
}