export class Unit {
    constructor(
        public id: number,
        public unitNo: string,
        public squareFeet: number,
        public block: number,
        public floor: number,
        public unitNumber: number,
        public isMaintenance: number,
        public isActive: boolean,
        public createdAt: string,
        public createdBy: number,
        public lastModifiedAt: string,
        public lastModifiedBy: number
    ) {}
}