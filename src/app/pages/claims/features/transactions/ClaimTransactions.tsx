import { useState } from "react";
import { useTransactionsClaim } from "../../../../hooks/claims/useClaimTransactions";
import ClaimTransactionsTable from "../../components/ClaimsTransactionsGrid";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../setup";

const ClaimTransactions: React.FC = () => {
    const {
        transactions,
        loading: loadingTrans,
        page,
        setPage,
        loadData: reloadTransactions,
        count,
    } = useTransactionsClaim(1, Math.random() * 50);
    const selectedUser = useSelector((state: RootState) => state.selectedUser?.current);

    return (
    <ClaimTransactionsTable
        data={transactions}
        loading={loadingTrans}
        setPage={setPage}
        onReload={reloadTransactions}
        totalCount={count}
        page={page}
        selectedUser={selectedUser}
    />
    );
};

export default ClaimTransactions;