import { ROLE_LIST } from '../constants/role'

export const getRoleDescriptionByCode = (code: string): string => {
    const role = ROLE_LIST.find((r) => r.code === code)
    return role?.description || code
}
