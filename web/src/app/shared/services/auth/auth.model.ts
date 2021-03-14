export class User {
    constructor(
        public id: string,
        public full_name: string,
        public new_nric: string,
        public old_nric: string,
        public phone: string,
        public tel: string,
        public email: string,
        public gender: string,
        public occupation: string,
        public user_type: string,
        public nric_picture: string,
        public profile_picture: string,
        public username: string,
        public is_active: boolean,
        public date_joined: string
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