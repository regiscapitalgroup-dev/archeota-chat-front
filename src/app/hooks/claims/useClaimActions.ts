import { useState, useEffect, useCallback, useRef } from 'react';
import { getActionsClaims } from '../../services/cliamsService';
import { ClaimsActionsModel } from '../../pages/claims/models/ClaimsActionsModel';

export const useActionsClaim = (id?: string) => {
    const [actions, setActions] = useState<ClaimsActionsModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const isMounted = useRef(true);

    useEffect(() => { 
        isMounted.current = true;
        return () =>{
        isMounted.current = false 
    }}, []);

    const loadActions = async () => {
        try {
            setLoading(true);
            let userId = id ? id : ''
            const data = await getActionsClaims(userId);
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
    };

    useEffect(() => {
        loadActions();
    }, [id]);

    return { actions, loading, error, reload: loadActions };
};
