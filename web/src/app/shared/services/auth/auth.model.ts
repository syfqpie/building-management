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