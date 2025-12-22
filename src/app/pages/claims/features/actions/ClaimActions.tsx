import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../../../../setup";
import { UserRoles } from "../../../../enums/userRoles";
import { useActionsClaim } from "../../../../hooks/claims/useClaimActions";
import { CompanyModel } from "../../../users/models/CompanyModel";
import ClaimActionAdmin from "../../components/templates/ClaimActionAdmin";
import ClaimActionClients from "../../components/templates/ClaimActionClients";
import { generateClaim } from "../../../../services/claimsService";
import { ClaimStatusEnum } from "../../components/atoms/enums/ClaimStatusEnum";

const ClaimsAction: React.FC = () => {
    const { user } = useSelector((root: RootState) => root.auth, shallowEqual);
    const [ companySelected, setCompanySelected] = useState<CompanyModel | null>(null);
    const { actions, loading: loadingAct, reload: reloadClaims } = useActionsClaim(companySelected?.id)
    const [claimStatus, setClaimStatus] = useState<ClaimStatusEnum | null>(null);
    
    const _handleOnClaim = async (id: number) => {
        try {
            setClaimStatus(ClaimStatusEnum.Loading);
            await generateClaim(id);
            await reloadClaims();
            setClaimStatus(ClaimStatusEnum.Success);
        }
        catch {
            setClaimStatus(ClaimStatusEnum.Error);
        }
    }

    return (
        <>
            { user?.role === UserRoles.FINAL_USER || user?.role === UserRoles.CLIENT ? (
                <ClaimActionClients 
                    claims={actions}
                    isLoadingClaims={loadingAct}
                    canClaim={user?.role === UserRoles.FINAL_USER}
                    onClaim={_handleOnClaim}
                    onReloadClaims={reloadClaims}
                />
            ) : (
                <ClaimActionAdmin
                    claimStatus={claimStatus}
                    onClaim={_handleOnClaim}
                    claims={actions}
                    isLoadingClaims={loadingAct}
                    onReloadClaims={reloadClaims}
                    setCompanySelected={setCompanySelected}
                    companySelected={companySelected}
                />
            )}
        </>
    );
};

export default ClaimsAction;