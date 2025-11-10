export interface UserCreateModel {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    role:string;
    password:string;
    active: boolean;
    address: string;
    country: string;
    national_id: string;
    phone_number: string;
    classifier_id?: number;
}