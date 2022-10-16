import { BlockNo } from '../block/block.model';
import { FloorNo } from '../floor/floor.model';
import { Resident } from '../residents/residents.model';
import { Vehicle, VehicleType } from '../vehicle/vehicle.model';

/**
 * A base class for the parking entity.
 *
 * @category Model
 */
export class Parking {
    /**
     * The constructor of the `Parking` class.
     *
     * @param id the parking's database ID
     * @param lotNo the parking's lot no.
     * @param block the parking's block ID
     * @param floor the parking's floor ID
     * @param lotType the parking's lot type {@link VehicleType} 
     * @param isOccupied the parking is occupied or not? 
     * @param isActive the parking is active or not? 
     * @param createdAt the parking's entry creation date and time 
     * @param createdBy the parking's entry creator ID
     * @param lastModifiedAt the parking's entry last modification date and time
     * @param lastModifiedBy the parking's entry last modificator ID
     */
    constructor(
        public id: number,
        public lotNo: string,
        public block: number,
        public floor: number,
        public lotType: VehicleType,
        public isOccupied: boolean,
        public isActive: boolean,
        public createdAt: string,
        public createdBy: number,
        public lastModifiedAt: string,
        public lastModifiedBy: number
    ) {}
}

/**
 * A class that extends {@link Parking | `Parking`}.
 */
export class ParkingExtended {
    /**
     * The constructor of the `ParkingExtended` class.
     *
     * @param id the parking's database ID
     * @param lotNo the parking's lot no.
     * @param block the parking's block information
     * @param floor the parking's floor information
     * @param lotType the parking's lot type {@link VehicleType} 
     * @param isOccupied the parking is occupied or not? 
     * @param isActive the parking is active or not? 
     * @param createdAt the parking's entry creation date and time 
     * @param createdBy the parking's entry creator ID
     * @param lastModifiedAt the parking's entry last modification date and time
     * @param lastModifiedBy the parking's entry last modificator ID
     */
    constructor(
        public id: number,
        public lotNo: string,
        public block: BlockNo,
        public floor: FloorNo,
        public lotType: VehicleType,
        public isOccupied: boolean,
        public isActive: boolean,
        public createdAt: string,
        public createdBy: number,
        public lastModifiedAt: string,
        public lastModifiedBy: number
    ) {}
}

/**
 * A base class for the parking pass entity.
 *
 * @category Model
 */
export class ParkingPass {
    /**
     * The constructor of the `ParkingPass` class.
     *
     * @param id the parking pass's database ID
     * @param accessCardNo the parking pass's access card no.
     * @param resident the parking pass's resident ID
     * @param vehicle the parking pass's vehicle ID
     * @param parkingLot the parking pass's parking lot ID
     * @param startedAt the parking pass's start date and time 
     * @param endedAt the parking pass's end date and time 
     * @param isActive the parking pass is active or not? 
     * @param createdBy the parking pass's entry creator ID
     * @param lastModifiedAt the parking pass's entry last modification date and time
     * @param lastModifiedBy the parking pass's entry last modificator ID
     */
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

/**
 * A class that extends {@link ParkingPass | `ParkingPass`}.
 */
export class ParkingPassCurrent {
    /**
     * The constructor of the `ParkingPassExtended` class.
     *
     * @param id the parking pass's database ID
     * @param accessCardNo the parking pass's access card no.
     * @param resident the parking pass's resident information
     * @param vehicle the parking pass's vehicle information
     * @param startedAt the parking pass's start date and time 
     * @param endedAt the parking pass's end date and time 
     * @param isActive the parking pass is active or not? 
     * @param createdBy the parking pass's entry creator ID
     * @param lastModifiedAt the parking pass's entry last modification date and time
     * @param lastModifiedBy the parking pass's entry last modificator ID
     */
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