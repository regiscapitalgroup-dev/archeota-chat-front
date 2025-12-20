export interface ClassLawsuitModel {
    id: number;
    tyckerSymbol: string;
    companyName: string;
    quantityStock: number;
    valuePerStock: number;
    amount: number;
    claimDate: string;
    status: string;
    sendFormat: boolean;
    acceptClaim: boolean;
    registerPayment: boolean;
}