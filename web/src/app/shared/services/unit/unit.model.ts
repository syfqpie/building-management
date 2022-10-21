import { Resident } from '../resident/resident.model';

/**
 * A base class for the unit entity.
 *
 * @category Model
 */
export class Unit {
    /**
     * The constructor of the `Unit` class.
     *
     * @param id the unit's database ID
     * @param unitNo the unit's unit no.
     * @param squareFeet the unit's square feet
     * @param block the unit's block ID
     * @param floor the unit's floor ID
     * @param unitNumber the unit's unit number ID
     * @param owner the unit's current owner ID
     * @param isMaintenance the unit is in maintenance or not?
     * @param isActive the unit is active or not?
     * @param createdAt the unit's entry creation date and time
     * @param createdBy the unit's entry creator ID
     * @param lastModifiedAt the unit's entry last modification date and time
     * @param lastModifiedBy the unit's entry last modificator ID
     */
    constructor(
        public id: number,
        public unitNo: string,
        public squareFeet: number,
        public block: number,
        public floor: number,
        public unitNumber: number,
        public owner: number,
        public isMaintenance: number,
        public isActive: boolean,
        public createdAt: string,
        public createdBy: number,
        public lastModifiedAt: string,
        public lastModifiedBy: number
    ) {}
}

/**
 * A class that extends {@link Unit | `Unit`}.
 */
export class UnitExtended {
    /**
     * The constructor of the `UnitExtended` class.
     *
     * @param id the unit's database ID
     * @param unitNo the unit's unit no.
     * @param squareFeet the unit's square feet
     * @param block the unit's block ID
     * @param floor the unit's floor ID
     * @param unitNumber the unit's unit number ID
     * @param owner the unit's current owner information
     * @param isMaintenance the unit is in maintenance or not?
     * @param isActive the unit is active or not?
     * @param createdAt the unit's entry creation date and time
     * @param createdBy the unit's entry creator ID
     * @param lastModifiedAt the unit's entry last modification date and time
     * @param lastModifiedBy the unit's entry last modificator ID
     */
    constructor(
        public id: number,
        public unitNo: string,
        public squareFeet: number,
        public block: number,
        public floor: number,
        public unitNumber: number,
        public owner: Resident,
        public isMaintenance: number,
        public isActive: boolean,
        public createdAt: string,
        public createdBy: number,
        public lastModifiedAt: string,
        public lastModifiedBy: number
    ) {}
}

/**
 * A simplified class for the unit entity.
 *
 * @category Model
 */
export class UnitNo {
    /**
     * The constructor of the `UnitNo` class.
     *
     * @param id the unit's database ID
     * @param unitNo the unit's unit no.
     */
    constructor(
        public id: number,
        public unitNo: string
    ) {}
}