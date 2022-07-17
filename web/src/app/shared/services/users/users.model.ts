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

export class UserVerification {
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
        public lastModifiedAt: string,
        public verification: Verification[]
    ){}
}

export class Verification {
    constructor(
        public email: string,
        public verified: boolean
    ) {}
}