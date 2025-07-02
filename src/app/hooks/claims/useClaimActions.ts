import { useState, useEffect } from 'react';
import { getActionsClaims } from '../../services/cliamsService';
import { ClaimsActionsModel } from '../../pages/claims/models/ClaimsActionsModel';

export const useActionsClaim = () => {
    const [actions, setActions] = useState<ClaimsActionsModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        const fetch = async () => {
            try {
                setLoading(true);
                const data = await getActionsClaims();
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
        };

        fetch()
        return () => {
            isMounted = false;
        };
    }, []);

    return { actions, loading, error };
};
