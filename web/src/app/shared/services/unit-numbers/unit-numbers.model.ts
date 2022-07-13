export class UnitNumber {
    constructor(
        public id: number,
        public unitNumber: string,
        public isActive: boolean,
        public createdAt: string,
        public createdBy: number,
        public lastModifiedAt: string,
        public lastModifiedBy: number
    ) {}
}