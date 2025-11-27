export interface UserFormModel {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    company: number;
    role:string;
    country: string;
    classification?: number;
    address: string;
    phone_number: string;
    national_id: string;
    active?: boolean;
}