import { BlockNo } from '../blocks/blocks.model';
import { FloorNo } from '../floors/floors.model';
import { Resident } from '../residents/residents.model';
import { Vehicle } from '../vehicles/vehicles.model';

export class Parking {
    constructor(
        public id: number,
        public lotNo: string,
        public block: number,
        public floor: number,
        public resident: number,
        public vehicle: number,
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
        public resident: Resident,
        public vehicle: Vehicle,
        public isActive: boolean,
        public createdAt: string,
        public createdBy: number,
        public lastModifiedAt: string,
        public lastModifiedBy: number
    ) {}
}