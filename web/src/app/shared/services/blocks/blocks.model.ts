export class Block {
    constructor(
        public id: number,
        public block: string,
        public isActive: string,
        public createdAt: string,
        public createdBy: string,
        public lastModifiedAt: string,
        public lastModifiedBy: string
    ) {}
}
