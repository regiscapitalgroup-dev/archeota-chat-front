export const Modules = {
    DASHBOARD: 'dashboard',
    ACTIONS: 'actions',
    TRANSACTIONS: 'transactions',
    USERS: 'users',
} as const

export type ModuleKey = typeof Modules[keyof typeof Modules]
