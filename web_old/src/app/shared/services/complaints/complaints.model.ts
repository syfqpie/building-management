import { UnitExtended } from '../units/units.model';

export class Complaint {
    constructor(
        public id: number,
        public complaint_no: string,
        public complainant: string,
        public contact_number: string,
        public unit: number,
        public status: string,
        public closed_at: string,
        public created_at: string,
        public modified_at: string
    ) {}
}

export class ComplaintExtended {
    constructor(
        public id: number,
        public complaint_no: string,
        public complainant: string,
        public contact_number: string,
        public unit: UnitExtended,
        public status: string,
        public closed_at: string,
        public created_at: string,
        public modified_at: string
    ) {}
}