import { BlockNo } from '../blocks/blocks.model';
import { FloorNo } from '../floors/floors.model';
import { Resident } from '../residents/residents.model';
import { Vehicle } from '../vehicle/vehicle.model';

export class Parking {
    constructor(
        public id: number,
        public lotNo: string,
        public block: number,
        public floor: number,
        public lotType: number,
        public isOccupied: boolean,
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
        public lotType: number,
        public isOccupied: boolean,
        public isActive: boolean,
        public createdAt: string,
        public createdBy: number,
        public lastModifiedAt: string,
        public lastModifiedBy: number
    ) {}
}

export class ParkingPass {
    constructor(
        public id: number,
        public accessCardNo: string,
        public resident: number,
        public vehicle: number,
        public parkingLot: number,
        public startedAt: string,
        public endedAt: string,
        public isActive: boolean,
        public createdBy: number,
        public lastModifiedAt: string,
        public lastModifiedBy: number
    ) {}
}

export class ParkingPassCurrent {
    constructor(
        public id: number,
        public accessCardNo: string,
        public resident: Resident,
        public vehicle: Vehicle,
        public startedAt: string,
        public endedAt: string,
        public isActive: boolean,
        public createdBy: number,
        public lastModifiedAt: string,
        public lastModifiedBy: number
    ) {}
}