/**
 * A base class for the user entity.
 *
 * @category Model
 */
export class User {
    /**
     * The constructor of the `User` class.
     *
     * @param id the user's database ID
     * @param email the user's email
     * @param fullName the user's full name
     * @param userType the user's user type {@link UserType}
     * @param isActive the user is active or not?
     * @param isStaff the user is staff or not?
     * @param isSuperuser the user is superuser or not?
     * @param lastLogin the user's last login date and time
     * @param dateJoined the user's joined date and time
     * @param createdAt the user's entry creation date and time
     * @param lastModifiedAt the user's entry last modification date and time
     */
    constructor(
        public id: number,
        public email: string,
        public fullName: string,
        public userType: UserType,
        public isActive: boolean,
        public isStaff: boolean,
        public isSuperuser: boolean,
        public lastLogin: string,
        public dateJoined: string,
        public createdAt: string,
        public lastModifiedAt: string
    ){}
}

/**
 * A custom class for the email address entity.
 *
 * @category Model
 */
export class EmailVerification {
    /**
     * The constructor of the `EmailVerification` class.
     *
     * @param email the user's email
     * @param verified the email is verified or not?
     * @param UserVerification the user's information
     */
    constructor(
        public email: string,
        public verified: boolean,
        public UserVerification: User
    ) {}
}

/**
 * A simplified class for the user entity.
 *
 * @category Model
 */
export class UserEmail {
    /**
     * The constructor of the `UserEmail` class.
     *
     * @param id the user's database ID
     * @param email the user's email
     */
    constructor(
        public id: number,
        public email: string
    ){}
}

/**
 * An enum for user types
 */
export enum UserType {
    /** An admin type user */
    ADMIN = 1,

    /** A public type user */
    PUBLIC = 2
}