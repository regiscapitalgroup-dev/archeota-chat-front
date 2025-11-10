import { ClassifierModel } from "./ClassifierModel";

export interface UserListModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    role: string;
    usersAssigned: number;
    isStaff: boolean;
    isActive: boolean;
    country: string;
    classifier_id?: number;
}

export interface UserCompleteModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    role: string;
    usersAssigned: number;
    isStaff: boolean;
    isActive: boolean;
    country: string;
    classifier?: string;
}