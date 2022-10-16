import { Resident } from '../resident/resident.model';

export class Unit {
    constructor(
        public id: number,
        public unitNo: string,
        public squareFeet: number,
        public block: number,
        public floor: number,
        public owner: number,
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
        public owner: Resident,
        public unitNumber: number,
        public isMaintenance: number,
        public isActive: boolean,
        public createdAt: string,
        public createdBy: number,
        public lastModifiedAt: string,
        public lastModifiedBy: number
    ) {}
}

export class UnitNo {
    constructor(
        public id: number,
        public unitNo: string
    ) {}
}