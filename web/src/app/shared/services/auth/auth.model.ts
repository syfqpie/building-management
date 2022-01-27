export class LoginResponse {
    constructor(
        public accessToken: string,
        public refreshToken: string,
        public user: User
    ) {}
}

export class User {
    constructor(
        public firstName: string,
        public lastName: string,
        public pk: string,
        public username: string,
        public email: string
    ) {}
}

export class ResponseDetail {
    constructor(
        public detail: string
    ) {}
}