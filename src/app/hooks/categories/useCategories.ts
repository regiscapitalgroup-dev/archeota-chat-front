import { useState, useEffect } from 'react';
import { getCategories } from '../../services/categoriesService';


export const useCategories = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        const fetch = async () => {
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
    }, []);

    return { categories, loading, error };
};
