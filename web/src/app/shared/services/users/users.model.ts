export class User {
    constructor(
        public id: number,
        public email: string,
        public fullName: string,
        public userType: number,
        public isActive: boolean,
        public isSuperuser: boolean,
        public lastLogin: string,
        public dateJoined: string,
        public createdAt: string,
        public lastModifiedAt: string
    ){}
}