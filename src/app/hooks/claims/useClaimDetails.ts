import { useCallback, useEffect, useRef, useState } from "react";
import { getClaimDetails } from "../../services/claimsService";
import { ClaimDetailsModel } from "./models/ClaimDetailsModel";

export const useClaimDetails = (claimId: number) => {
    const isMountedRef = useRef(false);
    const [loading, setLoading] = useState(false);
    const [ data, setData ] = useState<ClaimDetailsModel | null>(null);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        }
    }, []);

    const loadClaim = useCallback(async () => {
        if (!isMountedRef.current)
            return;
        setLoading(true);
        try {
            const _details = await getClaimDetails(claimId);
            setData(_details);
        }
        finally {
            setLoading(false);
        }
    }, [claimId]);

    useEffect(() => {
        loadClaim();
    }, [loadClaim]);
    
    return { loading, data, loadClaim}
}