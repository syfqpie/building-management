export class Resident {
    constructor(
        public id: number,
        public residentNo: string,
        public isOwner: boolean,
        public name: string,
        public phoneNo: string,
        public email: string,
        public isActive: boolean,
        public createdAt: string,
        public title?: number,
        public nric?: string,
        public gender?: number,
        public lastPaymentAt?: string,
        public renterUser?: number,
        public lastModifiedAt?: string,
        public lastModifiedBy?: string,
    ) {}
}

export enum TitleType {
    MR = 1,
    MRS = 2,
    MS = 3,
}

export enum GenderType {
    FEMALE = 1,
    MALE = 2
}