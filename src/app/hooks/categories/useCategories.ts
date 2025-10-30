import { useState, useEffect } from 'react';
import { getCategories } from '../../services/categoriesService';
import { UserModel } from '../../modules/auth/models/UserModel';


export const useCategories = (user?: UserModel ) => {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        const fetch = async () => {
            if(!user)
                return;
            try {
                setLoading(true);
                const data = await getCategories();
                if (isMounted) {
                    setCategories(data);
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
    }, [user]);

    return { categories, loading, error };
};
