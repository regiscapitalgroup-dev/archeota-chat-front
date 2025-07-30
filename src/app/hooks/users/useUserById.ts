import { useState, useEffect } from 'react';
import { getUserById } from '../../services/usersService';
import { UserCreateModel } from '../../pages/users/models/UsersCreateModel';

export const useUserById = (userId: number) => {
    const [user, setUser] = useState<UserCreateModel | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        const fetch = async () => {
            try {
                setLoading(true);
                const data = await getUserById(userId);
                if (isMounted) {
                    setUser({
                        ...data,
                        first_name: data?.firstName,
                        last_name: data?.lastName
                    });
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
        if (userId) {
            fetch()
        } else {
            setUser(null)
        }
        return () => {
            isMounted = false;
        };
    }, [userId]);

    return { user, loading, error };
};
