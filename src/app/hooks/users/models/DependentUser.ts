export interface DependentUser {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    country: string | null;
    nationalId: string;
    classificationName: string | null;
    classificationColor: string | null;
}