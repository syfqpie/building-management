export class User {
    constructor(
        public id: number,
        public email: string,
        public fullName: string,
        public userType: number,
        public isActive: boolean,
        public isStaff: boolean,
        public isSuperuser: boolean,
        public lastLogin: string,
        public dateJoined: string,
        public createdAt: string,
        public lastModifiedAt: string
    ){}
}

export class EmailVerification {
    constructor(
        public email: string,
        public verified: boolean,
        public UserVerification: User
    ) {}
}

export class UserEmail {
    constructor(
        public id: number,
        public email: string
    ){}
}

export enum UserType {
    ADMIN = 1,
    PUBLIC = 2
}