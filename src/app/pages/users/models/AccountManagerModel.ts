export interface AccountManagerModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    isActive: boolean;
    isStaff: boolean;
    phoneNumber: string;
    usersAssigned: number;
    country: string;
    classifier_id: number;
    users: number[];
}