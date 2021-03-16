import { Media } from '../medias/medias.model';
import { UnitExtended } from '../units/units.model';

export class Billing {
    constructor(
        public id: string,
        public bill_no: string,
        public unit: number,
        public is_paid: boolean,
        public paid_at: string,
        public bill_attachment: number,
        public created_at: string,
        public modified_at: string
    ) {}
}

export class BillingExtended {
    constructor(
        public id: string,
        public bill_no: string,
        public unit: UnitExtended,
        public is_paid: boolean,
        public paid_at: string,
        public bill_attachment: Media,
        public created_at: string,
        public modified_at: string
    ) {}
}