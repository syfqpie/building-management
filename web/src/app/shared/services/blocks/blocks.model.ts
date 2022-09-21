export class Block {
    constructor(
        public id: number,
        public block: string,
        public isActive: boolean,
        public createdAt: string,
        public createdBy: number,
        public lastModifiedAt: string,
        public lastModifiedBy: number
    ) {}
}

export class BlockNo {
    constructor(
        public id: number,
        public block: string
    ) {}
}