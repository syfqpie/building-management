export class Block {
    constructor(
        public id: number,
        public block: string,
        public is_active: string,
        public created_at: string,
        public modified_at: string
    ) {}
}