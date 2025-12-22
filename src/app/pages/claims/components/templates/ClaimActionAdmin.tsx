import { useEffect, useState } from "react";
import { useUserCompanies } from "../../../../hooks/company/useUserCompanies";
import { CompanyModel } from "../../../users/models/CompanyModel";
import { ClaimsActionsModel } from "../../models/ClaimsActionsModel";
import { CompanyOptions } from "../atoms/models/CompanyOptions";
import ClaimsActionsGrid from "../ClaimsActionsGrid";
import { ClaimStatusEnum } from "../atoms/enums/ClaimStatusEnum";

type Props = {
    claims: ClaimsActionsModel[];
    isLoadingClaims: boolean;
    companySelected: CompanyModel | null;
    claimStatus: ClaimStatusEnum | null;
    setCompanySelected: (company: CompanyModel | null) => void;
    onReloadClaims: () => void;
    onClaim: (id: number) => void;
}

const ClaimActionAdmin = ({ claims, isLoadingClaims, companySelected, claimStatus, setCompanySelected, onReloadClaims, onClaim }: Props) => {
    const { companies, loading: loadingCompanies } = useUserCompanies(true);

    useEffect(() => {
        if(companies.length <= 0)
            return;
        setCompanySelected(companies[0])
    }, [companies])

    const onSelectCompany = (company: CompanyOptions | null) => {
        if(!company)
            return;
        setCompanySelected(company.value);
    }

    return (
        <>
            <ClaimsActionsGrid 
                data={claims || []} 
                loading={isLoadingClaims}
                companies={companies}
                loadingCompanies={loadingCompanies}
                companySelected={companySelected}
                onCompanySelect={onSelectCompany}
                onReload={onReloadClaims}
                canClaim={true}
                claimStatus={claimStatus}
                onClaim={onClaim}
            />
            
        </>
    );
}

export default ClaimActionAdmin;