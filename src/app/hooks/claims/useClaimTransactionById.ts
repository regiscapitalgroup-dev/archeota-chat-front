import { useCallback, useEffect, useRef, useState } from "react"
import { ClaimTransactionModel } from "../../pages/claims/models/ClaimsTransactionsModel"
import { getTransactionsClaimById } from "../../services/claimsService";

export const useClaimTransactionById = () => {
    const isMountedRef = useRef(false);
    const [transaction, setTransaction] = useState<ClaimTransactionModel | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error|null>(null);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        }
    }, []);

    const getTransactionById = useCallback(async (id: number) => {
        if(!isMountedRef.current)
            return;
        setLoading(true);
        setTransaction(null);
        try {
            const _claim: ClaimTransactionModel = await getTransactionsClaimById(id);
            if(isMountedRef.current)
                setTransaction(_claim);
        }
        catch (error) {
            if(isMountedRef.current)
                setError(error as Error);
        }
        finally {
            if(isMountedRef.current)
                setLoading(false);
        }
    }, []);

    return { transaction, loading, error, getTransactionById };
}