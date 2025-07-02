import { useState, useEffect } from 'react';
import { getUsersRoles } from '../../services/usersService';

export const useUserRoles = () => {
    const [roles, setRoles] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        const fetch = async () => {
            try {
                setLoading(true);
                const data = await getUsersRoles();
                if (isMounted) {
                    setRoles(data);
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

    return { roles, loading, error };
};
