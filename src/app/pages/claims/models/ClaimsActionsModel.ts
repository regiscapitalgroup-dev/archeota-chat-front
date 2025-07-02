export interface ClaimsActionsModel {
  id: number;
  tyckerSymbol: string;
  companyName: string;
  exchange: string;
  lawsuitType: string;
  eligibility: string;
  potencialClaim?: string;
  totalSettlementFund: string;
  filingDate?: string;
  claimDeadline?: string;
  lawFirmHandingCase?: string;
  caseDocketNumber?: string;
  jurisdiction?: string;
  claimStatus: string;
  officialClaimFilingLink?: string;
  lastUpdate: string;
}
