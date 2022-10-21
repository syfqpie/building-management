/**
 * A base class for the unit number entity.
 *
 * @category Model
 */
export class UnitNumber {
    /**
     * The constructor of the `UnitNumber` class.
     *
     * @param id the unit number's database ID
     * @param unitNumber number the unit number's name
     * @param isActive the unit number is active or not? 
     * @param createdAt the unit number's entry creation date and time 
     * @param createdBy the unit number's entry creator ID
     * @param lastModifiedAt the unit number's entry last modification date and time
     * @param lastModifiedBy the unit number's entry last modificator ID
     */
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