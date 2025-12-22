import { useState, useEffect, useCallback, useRef } from 'react';
import { getActionsClaims } from '../../services/claimsService';
import { ClaimsActionsModel } from '../../pages/claims/models/ClaimsActionsModel';

export const useActionsClaim = (companyId?: number) => {
    const [actions, setActions] = useState<ClaimsActionsModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const isMounted = useRef(true);

    useEffect(() => { 
        isMounted.current = true;
        return () =>{
        isMounted.current = false 
    }}, []);

    const loadActions = useCallback(async () => {
        if(!isMounted.current)
            return;
        if(typeof companyId === "undefined") {
            setActions([]);
            return;
        }

        try {
            setActions([]);
            setLoading(true);
            const data = await getActionsClaims(companyId);
            if (isMounted.current) {
                setActions(data);
            }
        } catch (err) {
            if (isMounted.current) {
                setError(err as Error);
            }
        } finally {
            if (isMounted.current) {
                setLoading(false);
            }
        }
    }, [companyId]);

    useEffect(() => {
        loadActions();
    }, [loadActions]);

    return { actions, loading, error, reload: loadActions };
};
