import { useState, useEffect } from 'react';
import { AssetsCategoriesModel } from '../../pages/assets/models/AssetsCategories';
import { getAssetByCategories, getAssetCategories } from '../../services/assetsService';


export const useAssetsByCategories = ( reload: number) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        const fetch = async () => {
            try {
                setLoading(true);
                const data = await getAssetByCategories();
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
    }, [reload]);

    return { data, loading, error };
};
