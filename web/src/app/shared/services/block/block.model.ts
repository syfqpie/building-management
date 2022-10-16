/**
 * A base class for the block entity.
 *
 * @category Model
 */
export class Block {
    /**
     * The constructor of the `Block` class.
     *
     * @param id the block's database ID
     * @param block the block's name
     * @param isActive the block is active or not? 
     * @param createdAt the block's entry creation date and time 
     * @param createdBy the block's entry creator ID
     * @param lastModifiedAt the block's entry last modification date and time
     * @param lastModifiedBy the block's entry last modificator ID
     */
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

/**
 * A simplified class for the block entity.
 *
 * @category Model
 */
export class BlockNo {
    /**
     * The constructor of the `BlockNo` class.
     *
     * @param id the block's database ID
     * @param block the block's name
     */
    constructor(
        public id: number,
        public block: string
    ) {}
}