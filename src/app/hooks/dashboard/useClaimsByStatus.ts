import { useState, useEffect } from 'react';
import { getClaimsByStatus } from '../../services/cliamsService';

export const useClaimsByStatus = (user?:string) => {
    const [data, setData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        const fetch = async () => {
            try {
                setLoading(true);
                const data = await getClaimsByStatus(user);
                if (isMounted) {
                    setData(data);
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

    return { data, loading, error };
};
