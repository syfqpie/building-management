export class User {
    constructor(
        public id: string,
        public username: string,
        public name: string,
        public email: string,
        public userType: number,
        public isActive: boolean,
        public dateJoined: string,
        public lastLogin: string,
        public lastModifiedAt: string
    ) {}
}

export class TokenResponse {
    constructor(
        public refresh: string,
        public access: string
    ) {}
}

export class Registration {
    constructor(
        public username: string,
        public email: string,
        public password1: string,
        public password2: string
    ) {}
}
