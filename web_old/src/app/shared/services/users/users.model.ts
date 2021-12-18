export class User {
    constructor(
        public id: number,
        public full_name: string,
        public user_type: string,
        public email: string,
        public username: string,
        public is_active: boolean,
        public date_joined: string,
        public last_login: string
    ) {}
}