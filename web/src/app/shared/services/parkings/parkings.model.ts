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