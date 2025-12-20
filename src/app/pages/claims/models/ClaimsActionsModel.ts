export interface ClaimsActionsModel {
  id: number;
  company: number;
  tyckerSymbol: string;
  companyName: string;
  exchange: string;
  lawsuitType: string;
  eligibility: string;
  startEligibilityDate: string;
  finalEligibilityDate: string;
  potencialClaim?: string;
  totalSettlementFund: string;
  filingDate?: string;
  claimDeadline?: string;
  lawFirmHandingCase?: string;
  caseDocketNumber?: string;
  valuePerShare: number;
  jurisdiction?: string;
  claimStatus: string;
  claimFormatName: string;
  methodSendClaimFormat: string;
  email: string;
  officialClaimFilingLink?: string;
  lastUpdate: string;
  claimed: boolean;
}
