export class User {
    constructor(
        public user_id: string,
        public name: string,
        public email: string,
        public joined_at: string,
        public user_type: string,
        public is_active: string
    ) {}
}