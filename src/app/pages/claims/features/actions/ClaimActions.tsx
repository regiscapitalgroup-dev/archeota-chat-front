import { useSelector } from "react-redux";
import { RootState } from "../../../../../setup";
import { useActionsClaim } from "../../../../hooks/claims/useClaimActions";
import ClaimsActionsGrid from "../../components/ClaimsActionsGrid";

const ClaimsAction: React.FC = () => {
    const selectedUser = useSelector((state: RootState) => state.selectedUser?.current);
    const { actions, loading: loadingAct, reload: reloadClaims } = useActionsClaim(selectedUser?.id)
    
    return (
        <ClaimsActionsGrid 
            data={actions || []} 
            loading={loadingAct} 
            selectedUser={selectedUser} 
            onReload={reloadClaims}
        />
    );
};

export default ClaimsAction;