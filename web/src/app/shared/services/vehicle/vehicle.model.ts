import { Resident } from "../residents/residents.model";

/**
 * A base class for the vehicle entity.
 *
 * @category Model
 */
export class Vehicle {
    /**
     * The constructor of the `Vehicle` class.
     *
     * @param id the vehicle's database ID
     * @param plateNo the vehicle's plate no.
     * @param vehicleType the vehicle's type {@link VehicleType}
     * @param resident the vehicle's resident ID 
     * @param isActive the vehicle is active or not? 
     * @param createdAt the vehicle's entry creation date and time 
     * @param createdBy the vehicle's entry creator ID
     * @param lastModifiedAt the vehicle's entry last modification date and time
     * @param lastModifiedBy the vehicle's entry last modificator ID
     */
    constructor(
        public id: number,
        public plateNo: string,
		public vehicleType: VehicleType,
		public resident: number,
		public isActive: boolean,
        public createdAt: string,
        public createdBy: number,
        public lastModifiedAt: string,
        public lastModifiedBy: number
    ) {}
}

/**
 * A class that extends {@link Vehicle | `Vehicle`}.
 */
export class VehicleExtended {
    /**
     * The constructor of the `VehicleExtended` class.
     *
     * @param id the vehicle's database ID
     * @param plateNo the vehicle's plate no.
     * @param vehicleType the vehicle's type {@link VehicleType}
     * @param resident the vehicle's resident information
     * @param isActive the vehicle is active or not? 
     * @param createdAt the vehicle's entry creation date and time 
     * @param createdBy the vehicle's entry creator ID
     * @param lastModifiedAt the vehicle's entry last modification date and time
     * @param lastModifiedBy the vehicle's entry last modificator ID
     */
    constructor(
        public id: number,
        public plateNo: string,
		public vehicleType: VehicleType,
		public resident: Resident,
		public isActive: boolean,
        public createdAt: string,
        public createdBy: number,
        public lastModifiedAt: string,
        public lastModifiedBy: number
    ) {}
}

/**
 * An enum for vehicle types
 */
export enum VehicleType {
    /** A car type vehicle */
    CAR = 1,

    /** A motorcycle type vehicle */
    MOTOR = 2,

    /** A lorry type vehicle */
    LORRY = 3
}
