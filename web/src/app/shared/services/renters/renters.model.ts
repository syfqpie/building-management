export class Renter {
    constructor(
        public id: number,
        public renterNo: string,
        public name: string,
        public phoneNumber: string,
        public email: string,
        public isActive: boolean,
        public createdAt: string,
        public title?: number,
        public nric?: string,
        public gender?: number,
        public movedInAt?: string,
        public movedOutAt?: string,
        public deactivatedAt?: string,
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