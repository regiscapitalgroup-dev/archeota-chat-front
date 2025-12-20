import { useSelector } from "react-redux";
import { RootState } from "../../../../../setup";
import { useTransactionsClaim } from "../../../../hooks/claims/useClaimTransactions";
import ClaimTransactionsTable from "../../components/ClaimsTransactionsGrid";
import { useState } from "react";
import { UserListModel } from "../../../users/models/UserListModel";

const ClaimTransactions: React.FC = () => {
    const {
        transactions,
        loading: loadingTrans,
        page,
        setPage,
        setUser,
        loadData: reloadTransactions,
        count,
    } = useTransactionsClaim(1);
    const [userSelected, setUserSelected] = useState<UserListModel|null>(null);
    
    const _handleSelectUser = (user: UserListModel | null) => {
        setPage(1);
        setUserSelected(user);
        setUser(user?.id);
    }

    return (
        <ClaimTransactionsTable
            data={transactions}
            loading={loadingTrans}
            setPage={setPage}
            onReload={() => reloadTransactions()}
            totalCount={count}
            page={page}
            userSelected={userSelected}
            setUserSelected={_handleSelectUser}
        />
    );
};

export default ClaimTransactions;