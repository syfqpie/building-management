/**
 * A base class for the floor entity.
 *
 * @category Model
 */
export class Floor {
    /**
     * The constructor of the `Floor` class.
     *
     * @param id the floor's database ID
     * @param floor the floor's name
     * @param isActive the floor is active or not? 
     * @param createdAt the floor's entry creation date and time 
     * @param createdBy the floor's entry creator ID
     * @param lastModifiedAt the floor's entry last modification date and time
     * @param lastModifiedBy the floor's entry last modificator ID
     */
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

/**
 * A simplified class for the floor entity.
 *
 * @category Model
 */
export class FloorNo {
    /**
     * The constructor of the `FloorNo` class.
     *
     * @param id the floor's database ID
     * @param floor the floor's name
     */
    constructor(
        public id: number,
        public floor: string
    ) {}
}