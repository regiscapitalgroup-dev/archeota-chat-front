import { useCallback, useEffect, useRef, useState } from "react"
import { ClassLawsuitModel } from "./models/ClassLawsuitModel"
import { getClassLawsuits } from "../../services/claimsService";

export const useClassLawsuits = (company_id?: number) => {
    const isMountedRef = useRef(false);
    const [data, setData] = useState<ClassLawsuitModel[]>([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        }
    }, []);

    const loadClass = useCallback(async () => {
        if(!isMountedRef.current)
            return;
        setLoading(true);
        setData([]);
        try {
            const _data = await getClassLawsuits(company_id);
            if(isMountedRef.current)
                setData(_data);
        }
        finally {
            if(isMountedRef.current)
                setLoading(false);
        }
    }, [company_id]);

    useEffect(() => {
        loadClass();
    }, [loadClass])

    return { data, loading, loadClass };
}