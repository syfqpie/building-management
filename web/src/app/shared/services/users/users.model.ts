export class User {
    constructor(
        public id: number,
        public email: string,
        public username: string,
        public userType: number,
        public isActive: boolean,
        public dateJoined: string,
        public firstName?: string,
        public lastName?: string
    ){}
}