import { ModuleKey } from '../constants/modules'
import { ModulePermissions } from '../constants/permissions'

export const canAccessModule = (moduleKey: ModuleKey, roleCode: string): boolean => {
    const allowedRoles = ModulePermissions[moduleKey]
    return allowedRoles?.includes(roleCode) ?? false
}
