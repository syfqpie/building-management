export class User {
    constructor(
        public id: number,
        public fullName: string,
        public userType: string,
        public email: string,
        public username: string,
        public isActive: boolean,
        public dateJoined: string,
        public lastLogin: string
    ) {}
}
