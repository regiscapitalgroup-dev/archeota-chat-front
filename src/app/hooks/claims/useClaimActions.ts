import { useState, useEffect, useCallback } from 'react';
import { getActionsClaims } from '../../services/cliamsService';
import { ClaimsActionsModel } from '../../pages/claims/models/ClaimsActionsModel';

export const useActionsClaim = (id?: string) => {
    const [actions, setActions] = useState<ClaimsActionsModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const loadActions = useCallback(async () => {
        let isMounted = true;

        try {
            setLoading(true);
            let userId = id ? id : ''
            const data = await getActionsClaims(userId);
            if (isMounted) {
                setActions(data);
            }
        } catch (err) {
            if (isMounted) {
                setError(err as Error);
            }
        } finally {
            if (isMounted) {
                setLoading(false);
            }
        }
        return () => {
            isMounted = false
        }
    }, [id]);

    useEffect(() => {
        loadActions();
    }, [id]);

    return { actions, loading, error, reload: loadActions };
};
