import { Media } from '../medias/medias.model';
import { UnitExtended } from '../units/units.model';

export class Billing {
    constructor(
        public id: string,
        public billNo: string,
        public unit: number,
        public isPaid: boolean,
        public paidAt: string,
        public billAttachment: number,
        public createdAt: string,
        public createdBy: string,
        public lastModifiedAt: string,
        public lastModifiedBy: string
    ) {}
}

export class BillingExtended {
    constructor(
        public id: string,
        public billNo: string,
        public unit: UnitExtended,
        public isPaid: boolean,
        public paidAt: string,
        public billAttachment: Media,
        public createdAt: string,
        public createdBy: string,
        public lastModifiedAt: string,
        public lastModifiedBy: string
    ) {}
}
