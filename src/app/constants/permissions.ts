import { Modules } from "./modules";

export const ModulePermissions: Record<string, string[]> = {
    [Modules.DASHBOARD]: ['SUPER_ADMIN', 'COMPANY_ADMIN', 'COMPANY_MANAGER', 'FINAL_USER'],
    [Modules.USERS]: ['SUPER_ADMIN', 'COMPANY_ADMIN', 'COMPANY_MANAGER'],
    [Modules.ACTIONS]: ['SUPER_ADMIN', 'COMPANY_ADMIN', 'COMPANY_MANAGER'],
    [Modules.TRANSACTIONS]: ['SUPER_ADMIN', 'COMPANY_ADMIN', 'COMPANY_MANAGER', 'FINAL_USER'],
}
