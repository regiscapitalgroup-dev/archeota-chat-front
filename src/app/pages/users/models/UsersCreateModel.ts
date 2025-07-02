export interface UserCreateModel {
    id?: number,
    name: string
    email: string
    phoneNumber: string
    nationalId: number | null,
    roleId: number,
    corporationId: number
    userIds?: string[]
}