export class Vehicle {
    constructor(
        public id: number,
        public plateNo: string,
		public vehicleType: VehicleType,
		public resident: boolean,
		public isActive: boolean,
        public createdAt: string,
        public createdBy: number,
        public lastModifiedAt: string,
        public lastModifiedBy: number
    ) {}
}

export enum VehicleType {
    CAR = 1,
    MOTOR = 2,
    LORRY = 3
}