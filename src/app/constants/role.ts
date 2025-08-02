export interface RoleDefinition {
    code: string
    description: string
}

export const ROLE_LIST: RoleDefinition[] = [
    {
        code: 'SUPER_ADMIN',
        description: 'Super Administrator',
    },
    {
        code: 'COMPANY_ADMIN',
        description: 'Company Administrator',
    },
    {
        code: 'COMPANY_MANAGER',
        description: 'Company Manager',
    },
    {
        code: 'FINAL_USER',
        description: 'Final User',
    },
]
