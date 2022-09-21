export class Floor {
    constructor(
        public id: number,
        public floor: string,
        public isActive: boolean,
        public createdAt: string,
        public createdBy: number,
        public lastModifiedAt: string,
        public lastModifiedBy: number
    ) {}
}

export class FloorNo {
    constructor(
        public id: number,
        public floor: string
    ) {}
}