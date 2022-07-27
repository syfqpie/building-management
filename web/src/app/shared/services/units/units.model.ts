import { Renter } from '../renters/renters.model';

export class Unit {
    constructor(
        public id: number,
        public unitNo: string,
        public squareFeet: number,
        public block: number,
        public floor: number,
        public renter: number,
        public unitNumber: number,
        public isMaintenance: number,
        public isActive: boolean,
        public createdAt: string,
        public createdBy: number,
        public lastModifiedAt: string,
        public lastModifiedBy: number
    ) {}
}

export class UnitExtended {
    constructor(
        public id: number,
        public unitNo: string,
        public squareFeet: number,
        public block: number,
        public floor: number,
        public renter: Renter,
        public unitNumber: number,
        public isMaintenance: number,
        public isActive: boolean,
        public createdAt: string,
        public createdBy: number,
        public lastModifiedAt: string,
        public lastModifiedBy: number
    ) {}
}