import { UnitExtended } from '../units/units.model';

export class Complaint {
    constructor(
        public id: number,
        public complaintNo: string,
        public complainant: string,
        public contactNumber: string,
        public unit: number,
        public status: string,
        public closedAt: string,
        public createdAt: string,
        public createdBy: string,
        public lastModifiedAt: string,
        public lastModifiedBy: string
    ) {}
}

export class ComplaintExtended {
    constructor(
        public id: number,
        public complaintNo: string,
        public complainant: string,
        public contactNumber: string,
        public unit: UnitExtended,
        public status: string,
        public closedAt: string,
        public createdAt: string,
        public createdBy: string,
        public lastModifiedAt: string,
        public lastModifiedBy: string
    ) {}
}
