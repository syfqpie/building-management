export class LoginResponse {
    constructor(
        public accessToken: string,
        public refreshToken: string,
        public user: LoginUser
    ) {}
}

export class LoginUser {
    constructor(
        public firstName: string,
        public lastName: string,
        public pk: number,
        public username: string,
        public email: string
    ) {}
}

export class ResponseDetail {
    constructor(
        public detail: string
    ) {}
}