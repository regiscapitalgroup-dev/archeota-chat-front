import { useState, useEffect } from 'react';
import { AssetsCategoriesModel } from '../../pages/assets/models/AssetsCategories';
import { getAssetCategories } from '../../services/assetsService';


export const useAssetsCategories = () => {
    const [categories, setCategories] = useState<AssetsCategoriesModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        const fetch = async () => {
            try {
                setLoading(true);
                const data = await getAssetCategories();
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
