import { BlockNo } from '../blocks/blocks.model';
import { FloorNo } from '../floors/floors.model';
import { Resident } from '../residents/residents.model';

export class Parking {
    constructor(
        public id: number,
        public lotNo: string,
        public block: number,
        public floor: number,
        public owner: number,
        public isActive: boolean,
        public createdAt: string,
        public createdBy: number,
        public lastModifiedAt: string,
        public lastModifiedBy: number
    ) {}
}

export class ParkingExtended {
    constructor(
        public id: number,
        public lotNo: string,
        public block: BlockNo,
        public floor: FloorNo,
        public owner: Resident,
        public isActive: boolean,
        public createdAt: string,
        public createdBy: number,
        public lastModifiedAt: string,
        public lastModifiedBy: number
    ) {}
}