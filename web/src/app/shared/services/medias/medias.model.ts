export class Media {
    constructor(
        public id: number,
        public filename: string,
        public file_extension: string,
        public attachment: string,
        public created_at: string,
        public modified_at: string
    ) {}
}