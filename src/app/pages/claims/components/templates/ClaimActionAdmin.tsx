import { useEffect, useState } from "react";
import { useUserCompanies } from "../../../../hooks/company/useUserCompanies";
import { ClaimsActionsModel } from "../../models/ClaimsActionsModel";
import ClaimsActionsGrid from "../ClaimsActionsGrid";
import { CompanyModel } from "../../../users/models/CompanyModel";
import { CompanyOptions } from "../atoms/models/CompanyOptions";

type Props = {
    claims: ClaimsActionsModel[];
    isLoadingClaims: boolean;
    companySelected: CompanyModel | null;
    setCompanySelected: (company: CompanyModel | null) => void;
    onReloadClaims: () => void;
    onClaim: (id: number) => void;
}

const ClaimActionAdmin = ({ claims, isLoadingClaims, companySelected, setCompanySelected, onReloadClaims, onClaim }: Props) => {
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
                onClaim={onClaim}
            />
        </>
    );
}

export default ClaimActionAdmin;