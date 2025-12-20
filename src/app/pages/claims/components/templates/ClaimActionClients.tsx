import { useClassLawsuits } from "../../../../hooks/claims/useClassLawsuits";
import { ClaimsActionsModel } from "../../models/ClaimsActionsModel";
import ClaimsActionsGrid from "../ClaimsActionsGrid";
import ClassLawsuitsGrid from "../molecules/ClassLawsuitsGrid";

type Props = {
    claims: ClaimsActionsModel[];
    isLoadingClaims: boolean;
    canClaim: boolean;
    onReloadClaims: () => void;
    onClaim: (id: number) => Promise<void>;
}

const ClaimActionClients = ({ claims, isLoadingClaims, canClaim, onReloadClaims, onClaim }: Props) => {
    const { data: classes, loading: loadingClass, loadClass } = useClassLawsuits();
    
    const _handleOnClaim = async (id: number) => {
        if(!canClaim)
            return;
        await onClaim(id);
        await loadClass();
    }

    return (
        <>
            <ClaimsActionsGrid
                data={claims || []} 
                loading={isLoadingClaims}
                companies={[]}
                loadingCompanies={false}
                companySelected={null}
                onCompanySelect={() => {}}
                onReload={onReloadClaims}
                canClaim={canClaim}
                onClaim={_handleOnClaim}
            />
            <ClassLawsuitsGrid
                data={classes}
                loading={loadingClass}
                companySelected={null}
                onReload={loadClass}
            />
        </>
    );
}

export default ClaimActionClients;