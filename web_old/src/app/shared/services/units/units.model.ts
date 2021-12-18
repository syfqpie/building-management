import { Block } from '../blocks/blocks.model';
import { Complaint } from '../complaints/complaints.model';
import { Floor } from '../floors/floors.model';
import { Proprietor } from '../proprietors/proprietors.model';
import { UnitNumber } from '../unit-numbers/unit-numbers.model';

export class Unit {
    constructor(
        public id: number,
        public unit_no: string,
        public square_feet: number,
        public block: number,
        public floor: number,
        public unit_number: number,
        public proprietor: number,
        public is_active: boolean,
        public is_maintenance: boolean,
        public created_at: string,
        public modified_at: string
    ) {}
}

export class UnitExtended {
    constructor(
        public id: number,
        public unit_no: string,
        public square_feet: number,
        public block: Block,
        public floor: Floor,
        public unit_number: UnitNumber,
        public proprietor: Proprietor,
        public unit_complaints: Complaint[],
        public is_active: boolean,
        public is_maintenance: boolean,
        public created_at: string,
        public modified_at: string
    ) {}
}