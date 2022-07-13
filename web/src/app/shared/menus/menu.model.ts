export interface ParentItems {
    path: string
    title: string
    type: string
    iconType: string
    collapse?: string
    isCollapsed?: boolean
    isCollapsing?: any
    children?: ChildItems[]
}

export interface ChildItems {
    path: string
    title: string
    type?: string
    collapse?: string
    children?: ChildItems2[]
    isCollapsed?: boolean
}
export interface ChildItems2 {
    path?: string
    title?: string
    type?: string
}