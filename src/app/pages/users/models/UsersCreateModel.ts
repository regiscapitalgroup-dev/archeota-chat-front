export interface UserCreateModel {
    id?: number,
    first_name: string
    last_name: string
    email: string
    role:string
    password:string
    /* phoneNumber: string
    nationalId: number | null,
    roleId: number,
    corporationId: number
    userIds?: string[]
    signature?: string */
}