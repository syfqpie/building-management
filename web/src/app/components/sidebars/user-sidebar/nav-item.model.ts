export class NavItem {
    constructor(
        public path: string[],
        public title: string,
        public type: string,
        public icon: string,
        public children?: NavChild[]
    ) {}
}
  

export class NavChild {
    constructor(
        public title: string,
        public path: string[]
    ) {}
}
