import { useEffect, useRef, useState } from 'react';
import { getAssetByCategories } from '../../services/assetsService';


export const useAssetsByCategories = ( reload: number, user? :string) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const isMountedRef = useRef(false);

    useEffect(() => {
        isMountedRef.current = true;
        const fetch = async () => {
            if(!isMountedRef.current)
                return;
            try {
                setLoading(true);
                const data = await getAssetByCategories(user);
                setData(data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };
        fetch()
        return () => {
            isMountedRef.current = false;
        };
    }, [reload, user]);

    return { data, loading, error };
};
