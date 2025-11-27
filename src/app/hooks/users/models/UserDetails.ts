import { DependentUser } from "./DependentUser";

export interface UserDetails {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	roleDescription: string;
	isActive: boolean;
	managedBy: {
		id: number;
		firstName: string;
		lastName: string;
		email: string;
	}[];
	country: string | null;
	classificationName: string | null;
	classificationColor: string | null;
	classificationId: string | null;
	address: string | null;
	phoneNumber: string;
	nationalId: string;
	profilePicture: string;
	dependents?: DependentUser[];
	companyId: number;
	companyName: string;
}