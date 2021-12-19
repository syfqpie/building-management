import { Block } from '../blocks/blocks.model';
import { Complaint } from '../complaints/complaints.model';
import { Floor } from '../floors/floors.model';
import { Proprietor } from '../proprietors/proprietors.model';
import { UnitNumber } from '../unit-numbers/unit-numbers.model';

export class Unit {
    constructor(
        public id: number,
        public unitMo: string,
        public squareFeet: number,
        public block: number,
        public floor: number,
        public unitNumber: number,
        public proprietor: number,
        public isActive: boolean,
        public isMintenance: boolean,
        public createdAt: string,
        public createdBy: string,
        public lastModifiedAt: string,
        public lastModifiedBy: string
    ) {}
}

export class UnitExtended {
    constructor(
        public id: number,
        public unitMo: string,
        public squareFeet: number,
        public block: Block,
        public floor: Floor,
        public unitNumber: UnitNumber,
        public proprietor: Proprietor,
        public unitComplaints: Complaint[],
        public isActive: boolean,
        public isMintenance: boolean,
        public createdAt: string,
        public createdBy: string,
        public lastModifiedAt: string,
        public lastModifiedBy: string
    ) {}
}
