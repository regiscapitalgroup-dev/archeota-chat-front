import { UserModel } from "../../../modules/auth/models/UserModel";
import { ClaimsActionsModel } from "../../../pages/claims/models/ClaimsActionsModel";
import { ClassLawsuitModel } from "./ClassLawsuitModel";

export interface ClassFromClaim extends ClassLawsuitModel {
    holding: {
            id: number;
            lotNumber: number;
            name: string;
            startDate: string;
            endDate: string;
            symbol: string;
            quantity: number;
            costPerStock: string;
            amount: string;
            activity: string;
            useless: boolean;
        };
    user: UserModel;   
}

export interface ClaimDetailsModel extends ClaimsActionsModel {
    classActionsLawsuits: ClassFromClaim[];
}