export class Proprietor {
    constructor(
        public id: number,
        public proprietor_no: string,
        public title: string,
        public name: string,
        public nric: string,
        public gender: string,
        public phone_number: string,
        public email: string,
        public is_active: boolean,
        public moved_in_at: string,
        public moved_out_at: string,
        public deactivated_at: string,
        public last_payment_at: string,
        public created_at: string,
        public modified_at: string
    ) {}
}