export class Media {
    constructor(
        public id: number,
        public filename: string,
        public fileExtension: string,
        public attachment: string,
        public createdAt: string,
        public createdBy: string,
        public lastModifiedAt: string,
        public lastModifiedBy: string
    ) {}
}
