import { useState, useEffect } from 'react';
import {  getUsers } from '../../services/usersService';

export const useUsers = () => {
    const [users, setUsers] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        const fetch = async () => {
            try {
                setLoading(true);
                const data = await getUsers();
                if (isMounted) {
                    setUsers(data);
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

    return { users, loading, error };
};
