export class Proprietor {
    constructor(
        public id: number,
        public proprietorNo: string,
        public title: string,
        public name: string,
        public nric: string,
        public gender: string,
        public phoneNumber: string,
        public email: string,
        public isActive: boolean,
        public movedInAt: string,
        public movedOutAt: string,
        public deactivatedAt: string,
        public lastPaymentAt: string,
        public createdAt: string,
        public createdBy: string,
        public lastModifiedAt: string,
        public lastModifiedBy: string
    ) {}
}
