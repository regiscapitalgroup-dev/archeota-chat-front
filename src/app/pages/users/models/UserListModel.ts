
export interface UserListModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    dependentsCount: number;
    isActive: boolean;
    classification: string | null;
    color: string | null;
    company: string | null;
}